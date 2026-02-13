const crypto = require("crypto");
const { getSecretFromDB } = require("./mockDb");

const generateToken = async (email) => {
  try {
    const secret = await getSecretFromDB();

    return crypto
      .createHmac("sha256", secret)
      .update(email)
      .digest("base64");
  } catch (error) {
    console.log("token Generator failed: ", error.message);
    // THE BUG: Empty catch block.
    // Error is swallowed and undefined is returned.
  }
};

module.exports = { generateToken };
