exports.checkPassword = (pw1, pw2) => {
  if (pw1 != pw2) {
    return res.status(400).json({ error: "password must match" });
  }
};
