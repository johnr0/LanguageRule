CREATE TABLE IF NOT EXISTS keyphrase (
  keyphrase_id TEXT,
  keyphrase_text TEXT
);

CREATE TABLE IF NOT EXISTS rule (
  rule_id TEXT,
  user_id TEXT,
  input_condition TEXT,
  output_condition TEXT,
  backend_condition TEXT,
  rule JSON,
  keyphrase TEXT
);

