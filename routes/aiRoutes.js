const Anthropic = require("@anthropic-ai/sdk");
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const router = require("express").Router();

const upload = multer({ dest: "uploads/" });

const anthropic = new Anthropic({
  // defaults to process.env["ANTHROPIC_API_KEY"]
  apiKey: process.env["ANTHROPIC_API_KEY"],
});


router.post("/ai/trash", upload.single("image"), async (req, res) => {
  try {
    const imagePath = path.join(__dirname, "..", req.file.path);
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString("base64");

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      temperature: 0,
      messages: [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: req.file.mimetype,
            data: imageBase64
          }
        },
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "You are an AI tasked with analyzing images of potential trash and determining an appropriate token reward based on the presence, quantity, and rarity of the trash. Your goal is to encourage proper waste management and recycling efforts.\n\nPlease analyze the following image:\n\n<image>\n{{IMAGE}}\n</image>\n\nFirst, carefully examine the image to determine if there is actually trash present. Consider the following guidelines:\n- Look for objects that are clearly discarded or out of place in the environment\n- Identify items that are typically considered waste or recyclable materials\n- Be cautious not to mistake natural objects (leaves, branches, rocks) for trash\n\nIf you determine that trash is present in the image, assess the quantity and rarity of the trash. Consider factors such as:\n- The amount of trash (single item vs. multiple items)\n- The size of the trash items\n- The type of trash (common household items vs. less common or hazardous materials)\n- The potential environmental impact of the trash\n\nBased on your assessment, determine an appropriate token reward using the following criteria:\n- 0 tokens: No trash present in the image\n- 1 token: Small amount of common trash (e.g., a single plastic bottle or food wrapper)\n- 2 tokens: Moderate amount of common trash or a small amount of less common trash\n- 3 tokens: Large amount of common trash or a moderate amount of less common trash\n- 4 tokens: Very large amount of trash or presence of rare/hazardous materials\n- 5 tokens: Exceptional find of rare, hazardous, or large-scale illegal dumping\n\nProvide your reasoning for your decision, including your analysis of the presence, quantity, and rarity of trash in the image. Write your reasoning inside <reasoning> tags.\n\nThen, state your decision on whether trash is present in the image inside <decision> tags.\n\nFinally, if trash is present, provide the token reward amount inside <reward> tags. If no trash is present, omit the <reward> tags.\n\nRemember to be thorough in your analysis and clear in your explanations."
            }
          ]
        }
      ]
    });
    console.log(msg.content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});


module.exports = router;