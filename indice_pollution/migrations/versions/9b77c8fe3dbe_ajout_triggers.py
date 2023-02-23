"""Ajout triggers

Revision ID: 9b77c8fe3dbe
Revises: 649b57785efc
Create Date: 2021-06-07 13:53:14.475443

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9b77c8fe3dbe'
down_revision = '649b57785efc'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
    CREATE OR REPLACE FUNCTION indice_schema.check_zone() RETURNS trigger AS $check_zone$
    BEGIN
    	IF NEW.zone_id IS NULL THEN
    		return NULL;
	END IF;
        RETURN NEW;
    END;
    $check_zone$ LANGUAGE plpgsql;


    DROP TRIGGER IF EXISTS "indice_schema.check_new_episode" ON indice_schema.episode_pollution;
    CREATE TRIGGER "indice_schema.check_new_episode" BEFORE INSERT OR UPDATE ON indice_schema.episode_pollution
        FOR EACH ROW EXECUTE PROCEDURE indice_schema.check_zone();

    DROP TRIGGER IF EXISTS "indice_schema.check_new_indice" ON indice_schema."indiceATMO";
    CREATE TRIGGER "indice_schema.check_new_indice" BEFORE INSERT OR UPDATE ON indice_schema."indiceATMO"
        FOR EACH ROW EXECUTE PROCEDURE indice_schema.check_zone();
    """)


def downgrade():
    op.execute("""
    DROP FUNCTION indice_schema.check_zone;
    DROP TRIGGER IF EXISTS "indice_schema.check_new_episode" ON indice_schema.episode_pollution;
    DROP TRIGGER IF EXISTS "indice_schema.check_new_indice" ON indice_schema."indiceATMO";
    """)
