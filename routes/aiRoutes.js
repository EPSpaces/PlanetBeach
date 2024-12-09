const Anthropic = require("@anthropic-ai/sdk");
const path = require('path');
const fs = require('fs');

const router = require("express").Router();

function convertBase64(base64StringWithPrefix) {
  const regex = /^data:(image\/[a-zA-Z]+);base64,/;
  
  const match = base64StringWithPrefix.match(regex);

  if (match) {
    const mimeType = match[1];
    const rawBase64 = base64StringWithPrefix.replace(regex, '');
    
    return { mimeType, rawBase64 };
  } else {
    throw new Error("Invalid base64 string with MIME type prefix");
  }
}

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

function extractNumber(input) {
  const regex1 = /<reward>\n(\d+)\n<\/reward>/;
  const match1 = input.match(regex1);
  
  if (match1) {
      return match1[1];
  }

  const regex2 = /<reward>(\d+)<\/reward>/;
  const match2 = input.match(regex2);
  
  if (match2) {
      return match2[1];
  }

  return null;
}

router.post("/ai/trash", async (req, res) => {
  try {
    console.log(req.body.image);
    res.send("Hello");
    const imageBase64WithPrefix = req.body.image;
    const { fileType, rawBase64 } = convertBase64(imageBase64WithPrefix);

    if (match) {
      const mimeType = match[1];

    }

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      temperature: 0,
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "image",
              "source": {
                  "type": "base64",
                  "media_type": fileType,
                  "data": rawBase64,
              },
            },
            {
              "type": "text",
              "text": "You are an AI tasked with analyzing images of potential trash and determining an appropriate token reward based on the presence, quantity, and rarity of the trash. Your goal is to encourage proper waste management and recycling efforts.\n\nPlease analyze the image provided.\n\nFirst, carefully examine the image to determine if there is actually trash present. Consider the following guidelines:\n- Look for objects that are clearly discarded or out of place in the environment\n- Identify items that are typically considered waste or recyclable materials\n- Be cautious not to mistake natural objects (leaves, branches, rocks) for trash\n\nIf you determine that trash is present in the image, assess the quantity and rarity of the trash. Consider factors such as:\n- The amount of trash (single item vs. multiple items)\n- The size of the trash items\n- The type of trash (common household items vs. less common or hazardous materials)\n- The potential environmental impact of the trash\n\nBased on your assessment, determine an appropriate token reward using the following criteria:\n- 0 tokens: No trash present in the image\n- 1-3 token: Small amount of common trash (e.g., a single plastic bottle or food wrapper)\n- 5-10 tokens: Moderate amount of common trash or a small amount of less common trash\n- 15-30 tokens: Large amount of common trash or a moderate amount of less common trash\n- 50-100 tokens: Very large amount of trash or presence of rare/hazardous materials\n- 150-300 tokens: Exceptional find of rare, hazardous, or large-scale illegal dumping\n\nProvide your reasoning for your decision, including your analysis of the presence, quantity, and rarity of trash in the image. Write your reasoning inside <reasoning> tags.\n\nThen, state your decision on whether trash is present in the image inside <decision> tags.\n\nFinally, if trash is present, provide the token reward amount inside <reward> tags. If no trash is present, omit the <reward> tags. The <reward> tags should only include a integer.\n\nRemember to be thorough in your analysis and clear in your explanations."
            }
          ]
        }
      ]
    });
    //console.log(msg.content);
    //response.content[0].text
    let reward = extractNumber(msg.content[0].text);

    if (reward == null) {
      res.send({ reward: 0 })
    } else {
      res.send({ reward: reward });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;