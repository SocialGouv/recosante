CREATE OR REPLACE FUNCTION generate_random_id(table_name text, column_name text, prefix text, size integer)
RETURNS text AS $$
DECLARE
  new_id text;
  done bool;
BEGIN
  done := false;
  WHILE NOT done LOOP
    new_id := prefix || substr(md5(random()::text), 1, size);
    EXECUTE format('SELECT NOT EXISTS(SELECT 1 FROM %I WHERE %I = %L)',
      table_name, column_name, new_id) INTO done;
  END LOOP;
  RETURN new_id;
END;
$$ LANGUAGE plpgsql VOLATILE;