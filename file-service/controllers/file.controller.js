exports.uploadFile = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'File upload failed or invalid file type.' });
    }
  
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  };
  