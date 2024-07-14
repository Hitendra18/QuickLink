const INSERT_FILE = `
INSERT INTO files (id, file_ext, file_size)
  VALUES ($1, $2, $3);
`;

const GET_FILE_BY_ID = `
SELECT * FROM files WHERE id = $1;
`;

module.exports = { INSERT_FILE, GET_FILE_BY_ID };
