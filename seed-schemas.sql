--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 15.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY "public"."webpush_subscription_info" DROP CONSTRAINT IF EXISTS "webpush_subscription_info_inscription_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "recommandation_episode_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "recommandation_episode_fkey";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_webpush_subscription_info";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_vigilance_meteo_globale_recommandation_id_fk";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_vigilance_meteo_globale_id_fk";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_recommandation_indice_uv_id_fk";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_recommandation_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_newsletter_hebdo_template_id_fk";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_inscription_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_indice_uv_fk";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_vent_recommandation_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_vent_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_vagues_recommandation_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_vagues_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_pluie_recommandation_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_pluie_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_orages_recommandation_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_orages_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_neige_recommandation_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_neige_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_froid_recommandation_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_froid_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_crues_recommandation_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_crues_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_canicule_recommandation_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_canicule_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_avalanches_recommandation_id";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_fk_vigilance_avalanches_id";
ALTER TABLE IF EXISTS ONLY "public"."inscription" DROP CONSTRAINT IF EXISTS "inscription_commune_fk";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "fk_newsletter_recommandation_raep";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "fk_newsletter_recommandation_qa";
ALTER TABLE IF EXISTS ONLY "public"."kombu_message" DROP CONSTRAINT IF EXISTS "FK_kombu_message_queue";
ALTER TABLE IF EXISTS ONLY "indice_schema"."vigilance_meteo" DROP CONSTRAINT IF EXISTS "vigilance_meteo_zone_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."region" DROP CONSTRAINT IF EXISTS "region_zone_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."raep" DROP CONSTRAINT IF EXISTS "raep_zone_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."potentiel_radon" DROP CONSTRAINT IF EXISTS "potentiel_radon_zone_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."indice_uv" DROP CONSTRAINT IF EXISTS "indice_uv_zone_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."indiceATMO" DROP CONSTRAINT IF EXISTS "indiceATMO_zone_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."episode_pollution" DROP CONSTRAINT IF EXISTS "episode_pollution_zone_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."epci" DROP CONSTRAINT IF EXISTS "epci_zone_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."epci" DROP CONSTRAINT IF EXISTS "epci_departement_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."departement" DROP CONSTRAINT IF EXISTS "departement_zone_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."departement" DROP CONSTRAINT IF EXISTS "departement_region_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."commune" DROP CONSTRAINT IF EXISTS "departement_commune_id_fk";
ALTER TABLE IF EXISTS ONLY "indice_schema"."commune" DROP CONSTRAINT IF EXISTS "commune_zone_pollution_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."commune" DROP CONSTRAINT IF EXISTS "commune_zone_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."commune" DROP CONSTRAINT IF EXISTS "commune_epci_id_fkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."bassin_d_air" DROP CONSTRAINT IF EXISTS "bassin_d_air_zone_id_fkey";
DROP TRIGGER IF EXISTS "indice_schema.check_new_indice" ON "indice_schema"."indiceATMO";
DROP TRIGGER IF EXISTS "indice_schema.check_new_episode" ON "indice_schema"."episode_pollution";
DROP INDEX IF EXISTS "public"."newsletter_mail_list_id";
DROP INDEX IF EXISTS "public"."ix_webpush_subscription_info_inscription_id";
DROP INDEX IF EXISTS "public"."ix_newsletter_webpush_subscription_info_id";
DROP INDEX IF EXISTS "public"."ix_newsletter_short_id";
DROP INDEX IF EXISTS "public"."ix_newsletter_inscription_id";
DROP INDEX IF EXISTS "public"."ix_kombu_message_visible";
DROP INDEX IF EXISTS "public"."ix_kombu_message_timestamp_id";
DROP INDEX IF EXISTS "public"."ix_kombu_message_timestamp";
DROP INDEX IF EXISTS "indice_schema"."vigilance_zone_phenomene_date_export_idx";
DROP INDEX IF EXISTS "indice_schema"."raep_zone_validity_idx";
ALTER TABLE IF EXISTS ONLY "public"."webpush_subscription_info" DROP CONSTRAINT IF EXISTS "webpush_subscription_info_pkey";
ALTER TABLE IF EXISTS ONLY "public"."recommandation" DROP CONSTRAINT IF EXISTS "recommandation_pkey";
ALTER TABLE IF EXISTS ONLY "public"."newsletter" DROP CONSTRAINT IF EXISTS "newsletter_pkey";
ALTER TABLE IF EXISTS ONLY "public"."newsletter_hebdo_template" DROP CONSTRAINT IF EXISTS "newsletter_hebdo_template_pkey";
ALTER TABLE IF EXISTS ONLY "public"."kombu_queue" DROP CONSTRAINT IF EXISTS "kombu_queue_pkey";
ALTER TABLE IF EXISTS ONLY "public"."kombu_queue" DROP CONSTRAINT IF EXISTS "kombu_queue_name_key";
ALTER TABLE IF EXISTS ONLY "public"."kombu_message" DROP CONSTRAINT IF EXISTS "kombu_message_pkey";
ALTER TABLE IF EXISTS ONLY "public"."inscription" DROP CONSTRAINT IF EXISTS "inscription_pkey";
ALTER TABLE IF EXISTS ONLY "public"."celery_tasksetmeta" DROP CONSTRAINT IF EXISTS "celery_tasksetmeta_taskset_id_key";
ALTER TABLE IF EXISTS ONLY "public"."celery_tasksetmeta" DROP CONSTRAINT IF EXISTS "celery_tasksetmeta_pkey";
ALTER TABLE IF EXISTS ONLY "public"."celery_taskmeta" DROP CONSTRAINT IF EXISTS "celery_taskmeta_task_id_key";
ALTER TABLE IF EXISTS ONLY "public"."celery_taskmeta" DROP CONSTRAINT IF EXISTS "celery_taskmeta_pkey";
ALTER TABLE IF EXISTS ONLY "public"."avis" DROP CONSTRAINT IF EXISTS "avis_pkey";
ALTER TABLE IF EXISTS ONLY "public"."alembic_version" DROP CONSTRAINT IF EXISTS "alembic_version_pkc";
ALTER TABLE IF EXISTS ONLY "indice_schema"."zone" DROP CONSTRAINT IF EXISTS "zone_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."vigilance_meteo" DROP CONSTRAINT IF EXISTS "vigilance_meteo_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."region" DROP CONSTRAINT IF EXISTS "region_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."raep" DROP CONSTRAINT IF EXISTS "raep_unique_zoneid_validity";
ALTER TABLE IF EXISTS ONLY "indice_schema"."raep" DROP CONSTRAINT IF EXISTS "raep_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."potentiel_radon" DROP CONSTRAINT IF EXISTS "potentiel_radon_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."indice_uv" DROP CONSTRAINT IF EXISTS "indice_uv_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."indice_history" DROP CONSTRAINT IF EXISTS "indice_history_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."indiceATMO" DROP CONSTRAINT IF EXISTS "indiceATMO_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."episode_pollution" DROP CONSTRAINT IF EXISTS "episode_pollution_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."episode_history" DROP CONSTRAINT IF EXISTS "episode_history_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."epci" DROP CONSTRAINT IF EXISTS "epci_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."departement" DROP CONSTRAINT IF EXISTS "departement_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."commune" DROP CONSTRAINT IF EXISTS "commune_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."bassin_d_air" DROP CONSTRAINT IF EXISTS "bassin_d_air_pkey";
ALTER TABLE IF EXISTS ONLY "indice_schema"."alembic_version" DROP CONSTRAINT IF EXISTS "alembic_version_pkc";
ALTER TABLE IF EXISTS "public"."webpush_subscription_info" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."recommandation" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."newsletter_hebdo_template" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."newsletter" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."inscription" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."avis" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "indice_schema"."zone" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "indice_schema"."vigilance_meteo" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "indice_schema"."region" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "indice_schema"."raep" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "indice_schema"."indice_history" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "indice_schema"."episode_history" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "indice_schema"."epci" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "indice_schema"."departement" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "indice_schema"."commune" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "indice_schema"."bassin_d_air" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE IF EXISTS "public"."webpush_subscription_info_id_seq";
DROP TABLE IF EXISTS "public"."webpush_subscription_info";
DROP SEQUENCE IF EXISTS "public"."taskset_id_sequence";
DROP SEQUENCE IF EXISTS "public"."task_id_sequence";
DROP SEQUENCE IF EXISTS "public"."recommandation_id_seq";
DROP TABLE IF EXISTS "public"."recommandation";
DROP SEQUENCE IF EXISTS "public"."queue_id_sequence";
DROP SEQUENCE IF EXISTS "public"."newsletter_id_seq";
DROP SEQUENCE IF EXISTS "public"."newsletter_hebdo_template_id_seq";
DROP TABLE IF EXISTS "public"."newsletter_hebdo_template";
DROP TABLE IF EXISTS "public"."newsletter";
DROP SEQUENCE IF EXISTS "public"."message_id_sequence";
DROP TABLE IF EXISTS "public"."kombu_queue";
DROP TABLE IF EXISTS "public"."kombu_message";
DROP SEQUENCE IF EXISTS "public"."inscription_id_seq";
DROP TABLE IF EXISTS "public"."inscription";
DROP TABLE IF EXISTS "public"."celery_tasksetmeta";
DROP TABLE IF EXISTS "public"."celery_taskmeta";
DROP SEQUENCE IF EXISTS "public"."avis_id_seq";
DROP TABLE IF EXISTS "public"."avis";
DROP TABLE IF EXISTS "public"."alembic_version";
DROP SEQUENCE IF EXISTS "indice_schema"."zone_id_seq";
DROP TABLE IF EXISTS "indice_schema"."zone";
DROP SEQUENCE IF EXISTS "indice_schema"."vigilance_meteo_id_seq";
DROP TABLE IF EXISTS "indice_schema"."vigilance_meteo";
DROP SEQUENCE IF EXISTS "indice_schema"."region_id_seq";
DROP TABLE IF EXISTS "indice_schema"."region";
DROP SEQUENCE IF EXISTS "indice_schema"."raep_id_seq";
DROP TABLE IF EXISTS "indice_schema"."raep";
DROP TABLE IF EXISTS "indice_schema"."potentiel_radon";
DROP TABLE IF EXISTS "indice_schema"."indice_uv";
DROP SEQUENCE IF EXISTS "indice_schema"."indice_history_id_seq";
DROP TABLE IF EXISTS "indice_schema"."indice_history";
DROP TABLE IF EXISTS "indice_schema"."indiceATMO";
DROP TABLE IF EXISTS "indice_schema"."episode_pollution";
DROP SEQUENCE IF EXISTS "indice_schema"."episode_history_id_seq";
DROP TABLE IF EXISTS "indice_schema"."episode_history";
DROP SEQUENCE IF EXISTS "indice_schema"."epci_id_seq";
DROP TABLE IF EXISTS "indice_schema"."epci";
DROP SEQUENCE IF EXISTS "indice_schema"."departement_id_seq";
DROP TABLE IF EXISTS "indice_schema"."departement";
DROP SEQUENCE IF EXISTS "indice_schema"."commune_id_seq";
DROP TABLE IF EXISTS "indice_schema"."commune";
DROP SEQUENCE IF EXISTS "indice_schema"."bassin_d_air_id_seq";
DROP TABLE IF EXISTS "indice_schema"."bassin_d_air";
DROP TABLE IF EXISTS "indice_schema"."alembic_version";
DROP FUNCTION IF EXISTS "public"."get_random_string"("string_length" integer, "possible_chars" "text");
DROP FUNCTION IF EXISTS "public"."generate_random_id"("table_schema" "text", "table_name" "text", "column_name" "text", "string_length" integer, "possible_chars" "text");
DROP FUNCTION IF EXISTS "indice_schema"."check_zone"();
DROP TYPE IF EXISTS "public"."frequence_enum";
DROP TYPE IF EXISTS "public"."diffusion_enum";
DROP SCHEMA IF EXISTS "public";
DROP SCHEMA IF EXISTS "indice_schema";
--
-- Name: indice_schema; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "indice_schema";


--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "public";


--
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


--
-- Name: diffusion_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE "public"."diffusion_enum" AS ENUM (
    'sms',
    'mail'
);


--
-- Name: frequence_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE "public"."frequence_enum" AS ENUM (
    'quotidien',
    'pollution'
);


--
-- Name: check_zone(); Type: FUNCTION; Schema: indice_schema; Owner: -
--

CREATE FUNCTION "indice_schema"."check_zone"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
    BEGIN
    	IF NEW.zone_id IS NULL THEN
    		return NULL;
	END IF;
        RETURN NEW;
    END;
    $$;


--
-- Name: generate_random_id("text", "text", "text", integer, "text"); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION "public"."generate_random_id"("table_schema" "text", "table_name" "text", "column_name" "text", "string_length" integer, "possible_chars" "text" DEFAULT '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'::"text") RETURNS "text"
    LANGUAGE "plpgsql" STRICT
    SET "search_path" TO 'public'
    AS $_$
DECLARE
    v_random_id   text;
    v_temp        text;
    v_length      int4   :=  string_length;
    v_sql         text;
    v_advisory_1  int4 := hashtext( format('%I:%I:%I', table_schema, table_name, column_name) );
    v_advisory_2  int4;
    v_advisory_ok bool;
BEGIN
    v_sql := format( 'SELECT %I FROM %I.%I WHERE %I = $1', column_name, table_schema, table_name, column_name );
    LOOP
        v_random_id := get_random_string( v_length, possible_chars );
        v_advisory_2 := hashtext( v_random_id );
        v_advisory_ok := pg_try_advisory_xact_lock( v_advisory_1, v_advisory_2 );
        IF v_advisory_ok THEN
            EXECUTE v_sql INTO v_temp USING v_random_id;
            exit when v_temp is null;
        END IF;
        v_length := v_length + 1;
    END LOOP;
    return v_random_id;
END;
$_$;


--
-- Name: get_random_string(integer, "text"); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION "public"."get_random_string"("string_length" integer, "possible_chars" "text" DEFAULT '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'::"text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    output TEXT = '';
    i INT4;
    pos INT4;
BEGIN
    FOR i IN 1..string_length LOOP
        pos := 1 + cast( random() * ( length(possible_chars) - 1) as INT4 );
        output := output || substr(possible_chars, pos, 1);
    END LOOP;
    RETURN output;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: alembic_version; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."alembic_version" (
    "version_num" character varying(32) NOT NULL
);


--
-- Name: bassin_d_air; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."bassin_d_air" (
    "id" integer NOT NULL,
    "nom" character varying,
    "code" character varying,
    "zone_id" integer
);


--
-- Name: bassin_d_air_id_seq; Type: SEQUENCE; Schema: indice_schema; Owner: -
--

CREATE SEQUENCE "indice_schema"."bassin_d_air_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bassin_d_air_id_seq; Type: SEQUENCE OWNED BY; Schema: indice_schema; Owner: -
--

ALTER SEQUENCE "indice_schema"."bassin_d_air_id_seq" OWNED BY "indice_schema"."bassin_d_air"."id";


--
-- Name: commune; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."commune" (
    "id" integer NOT NULL,
    "insee" character varying,
    "nom" character varying,
    "centre" character varying,
    "code_zone" character varying,
    "departement_id" integer,
    "epci_id" integer,
    "zone_id" integer,
    "zone_pollution_id" integer,
    "pollinarium_sentinelle" boolean,
    "codes_postaux" character varying[],
    "tncc" integer,
    "nccenr" character varying
);


--
-- Name: commune_id_seq; Type: SEQUENCE; Schema: indice_schema; Owner: -
--

CREATE SEQUENCE "indice_schema"."commune_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: commune_id_seq; Type: SEQUENCE OWNED BY; Schema: indice_schema; Owner: -
--

ALTER SEQUENCE "indice_schema"."commune_id_seq" OWNED BY "indice_schema"."commune"."id";


--
-- Name: departement; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."departement" (
    "id" integer NOT NULL,
    "nom" character varying,
    "code" character varying,
    "region_id" integer,
    "preposition" character varying,
    "zone_id" integer,
    "tncc" integer,
    "nccenr" character varying
);


--
-- Name: departement_id_seq; Type: SEQUENCE; Schema: indice_schema; Owner: -
--

CREATE SEQUENCE "indice_schema"."departement_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: departement_id_seq; Type: SEQUENCE OWNED BY; Schema: indice_schema; Owner: -
--

ALTER SEQUENCE "indice_schema"."departement_id_seq" OWNED BY "indice_schema"."departement"."id";


--
-- Name: epci; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."epci" (
    "id" integer NOT NULL,
    "code" character varying,
    "label" character varying,
    "departement_id" integer,
    "zone_id" integer
);


--
-- Name: epci_id_seq; Type: SEQUENCE; Schema: indice_schema; Owner: -
--

CREATE SEQUENCE "indice_schema"."epci_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: epci_id_seq; Type: SEQUENCE OWNED BY; Schema: indice_schema; Owner: -
--

ALTER SEQUENCE "indice_schema"."epci_id_seq" OWNED BY "indice_schema"."epci"."id";


--
-- Name: episode_history; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."episode_history" (
    "id" integer NOT NULL,
    "date_" "date" NOT NULL,
    "features" "json" NOT NULL,
    "code_zone" character varying NOT NULL,
    "polluant" character varying
);


--
-- Name: episode_history_id_seq; Type: SEQUENCE; Schema: indice_schema; Owner: -
--

CREATE SEQUENCE "indice_schema"."episode_history_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: episode_history_id_seq; Type: SEQUENCE OWNED BY; Schema: indice_schema; Owner: -
--

ALTER SEQUENCE "indice_schema"."episode_history_id_seq" OWNED BY "indice_schema"."episode_history"."id";


--
-- Name: episode_pollution; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."episode_pollution" (
    "zone_id" integer NOT NULL,
    "date_ech" timestamp without time zone NOT NULL,
    "date_dif" timestamp without time zone NOT NULL,
    "code_pol" integer NOT NULL,
    "etat" character varying,
    "com_court" character varying,
    "com_long" character varying
);


--
-- Name: indiceATMO; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."indiceATMO" (
    "zone_id" integer NOT NULL,
    "date_ech" timestamp without time zone NOT NULL,
    "date_dif" timestamp without time zone NOT NULL,
    "no2" integer,
    "so2" integer,
    "o3" integer,
    "pm10" integer,
    "pm25" integer,
    "valeur" integer
);


--
-- Name: indice_history; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."indice_history" (
    "id" integer NOT NULL,
    "date_" "date" NOT NULL,
    "insee" character varying NOT NULL,
    "features" "json" NOT NULL
);


--
-- Name: indice_history_id_seq; Type: SEQUENCE; Schema: indice_schema; Owner: -
--

CREATE SEQUENCE "indice_schema"."indice_history_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indice_history_id_seq; Type: SEQUENCE OWNED BY; Schema: indice_schema; Owner: -
--

ALTER SEQUENCE "indice_schema"."indice_history_id_seq" OWNED BY "indice_schema"."indice_history"."id";


--
-- Name: indice_uv; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."indice_uv" (
    "zone_id" integer NOT NULL,
    "date" "date" NOT NULL,
    "uv_j0" integer,
    "uv_j1" integer,
    "uv_j2" integer,
    "uv_j3" integer
);


--
-- Name: potentiel_radon; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."potentiel_radon" (
    "zone_id" integer NOT NULL,
    "classe_potentiel" integer
);


--
-- Name: raep; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."raep" (
    "id" integer NOT NULL,
    "zone_id" integer NOT NULL,
    "validity" "daterange" NOT NULL,
    "cypres" integer,
    "noisetier" integer,
    "aulne" integer,
    "peuplier" integer,
    "saule" integer,
    "frene" integer,
    "charme" integer,
    "bouleau" integer,
    "platane" integer,
    "chene" integer,
    "olivier" integer,
    "tilleul" integer,
    "chataignier" integer,
    "rumex" integer,
    "graminees" integer,
    "plantain" integer,
    "urticacees" integer,
    "armoises" integer,
    "ambroisies" integer,
    "total" integer
);


--
-- Name: raep_id_seq; Type: SEQUENCE; Schema: indice_schema; Owner: -
--

CREATE SEQUENCE "indice_schema"."raep_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: raep_id_seq; Type: SEQUENCE OWNED BY; Schema: indice_schema; Owner: -
--

ALTER SEQUENCE "indice_schema"."raep_id_seq" OWNED BY "indice_schema"."raep"."id";


--
-- Name: region; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."region" (
    "id" integer NOT NULL,
    "nom" character varying,
    "code" character varying,
    "aasqa_website" character varying,
    "aasqa_nom" character varying,
    "zone_id" integer,
    "tncc" integer,
    "nccenr" character varying
);


--
-- Name: region_id_seq; Type: SEQUENCE; Schema: indice_schema; Owner: -
--

CREATE SEQUENCE "indice_schema"."region_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: region_id_seq; Type: SEQUENCE OWNED BY; Schema: indice_schema; Owner: -
--

ALTER SEQUENCE "indice_schema"."region_id_seq" OWNED BY "indice_schema"."region"."id";


--
-- Name: vigilance_meteo; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."vigilance_meteo" (
    "id" integer NOT NULL,
    "zone_id" integer,
    "phenomene_id" integer,
    "date_export" timestamp without time zone,
    "couleur_id" integer,
    "validity" "tstzrange" NOT NULL
);


--
-- Name: vigilance_meteo_id_seq; Type: SEQUENCE; Schema: indice_schema; Owner: -
--

CREATE SEQUENCE "indice_schema"."vigilance_meteo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vigilance_meteo_id_seq; Type: SEQUENCE OWNED BY; Schema: indice_schema; Owner: -
--

ALTER SEQUENCE "indice_schema"."vigilance_meteo_id_seq" OWNED BY "indice_schema"."vigilance_meteo"."id";


--
-- Name: zone; Type: TABLE; Schema: indice_schema; Owner: -
--

CREATE TABLE "indice_schema"."zone" (
    "id" integer NOT NULL,
    "type" character varying,
    "code" character varying
);


--
-- Name: zone_id_seq; Type: SEQUENCE; Schema: indice_schema; Owner: -
--

CREATE SEQUENCE "indice_schema"."zone_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: zone_id_seq; Type: SEQUENCE OWNED BY; Schema: indice_schema; Owner: -
--

ALTER SEQUENCE "indice_schema"."zone_id_seq" OWNED BY "indice_schema"."zone"."id";


--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."alembic_version" (
    "version_num" character varying(32) NOT NULL
);


--
-- Name: avis; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."avis" (
    "id" integer NOT NULL,
    "mail" character varying,
    "decouverte" character varying[],
    "satisfaction_nombre_recommandation" boolean,
    "satisfaction_frequence" character varying,
    "recommandabilite" integer,
    "encore" boolean,
    "autres_thematiques" character varying,
    "date" "date"
);


--
-- Name: avis_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."avis_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: avis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."avis_id_seq" OWNED BY "public"."avis"."id";


--
-- Name: celery_taskmeta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."celery_taskmeta" (
    "id" integer NOT NULL,
    "task_id" character varying(155),
    "status" character varying(50),
    "result" "bytea",
    "date_done" timestamp without time zone,
    "traceback" "text",
    "name" character varying(155),
    "args" "bytea",
    "kwargs" "bytea",
    "worker" character varying(155),
    "retries" integer,
    "queue" character varying(155)
);


--
-- Name: celery_tasksetmeta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."celery_tasksetmeta" (
    "id" integer NOT NULL,
    "taskset_id" character varying(155),
    "result" "bytea",
    "date_done" timestamp without time zone
);


--
-- Name: inscription; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."inscription" (
    "id" integer NOT NULL,
    "ville_entree" character varying,
    "ville_name" character varying,
    "ville_insee" character varying,
    "deplacement" character varying[],
    "sport" boolean,
    "apa" boolean,
    "activites" character varying[],
    "telephone" character varying,
    "mail" character varying,
    "date_inscription" "date",
    "frequence" "public"."frequence_enum",
    "diffusion" "public"."diffusion_enum",
    "cache_api_commune" "jsonb",
    "deactivation_date" "date",
    "uid" character varying DEFAULT "public"."generate_random_id"('public'::"text", 'inscription'::"text", 'uid'::"text", 8),
    "animaux_domestiques" character varying[],
    "chauffage" character varying[],
    "connaissance_produit" character varying[],
    "population" character varying[],
    "enfants" character varying,
    "ouvertures" "date"[],
    "notifications" character varying[],
    "recommandations" character varying[],
    "commune_id" integer,
    "indicateurs" character varying[],
    "indicateurs_frequence" character varying[],
    "indicateurs_media" character varying[],
    "recommandations_actives" character varying[],
    "recommandations_frequence" character varying[],
    "recommandations_media" character varying[]
);


--
-- Name: inscription_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."inscription_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: inscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."inscription_id_seq" OWNED BY "public"."inscription"."id";


--
-- Name: kombu_message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."kombu_message" (
    "id" integer NOT NULL,
    "visible" boolean,
    "timestamp" timestamp without time zone,
    "payload" "text" NOT NULL,
    "version" smallint NOT NULL,
    "queue_id" integer
);


--
-- Name: kombu_queue; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."kombu_queue" (
    "id" integer NOT NULL,
    "name" character varying(200)
);


--
-- Name: message_id_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."message_id_sequence"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: newsletter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."newsletter" (
    "id" integer NOT NULL,
    "inscription_id" integer,
    "recommandation_id" integer,
    "date" "date",
    "appliquee" boolean,
    "avis" character varying,
    "short_id" character varying DEFAULT "public"."generate_random_id"('public'::"text", 'newsletter'::"text", 'short_id'::"text", 8),
    "qualif" character varying,
    "polluants" character varying[],
    "raep" integer,
    "allergenes" "jsonb",
    "lien_aasqa" character varying,
    "nom_aasqa" character varying,
    "couleur" character varying,
    "label" character varying,
    "raep_debut_validite" character varying,
    "raep_fin_validite" character varying,
    "show_raep" boolean,
    "radon" integer,
    "show_radon" boolean,
    "sous_indices" "jsonb",
    "webpush_subscription_info_id" integer,
    "recommandation_qa_id" integer,
    "recommandation_raep_id" integer,
    "mail_list_id" integer,
    "recommandation_episode_id" integer,
    "newsletter_hebdo_template_id" integer,
    "vigilance_vent_id" integer,
    "vigilance_vent_recommandation_id" integer,
    "vigilance_pluie_id" integer,
    "vigilance_pluie_recommandation_id" integer,
    "vigilance_orages_id" integer,
    "vigilance_orages_recommandation_id" integer,
    "vigilance_crues_id" integer,
    "vigilance_crues_recommandation_id" integer,
    "vigilance_neige_id" integer,
    "vigilance_neige_recommandation_id" integer,
    "vigilance_canicule_id" integer,
    "vigilance_canicule_recommandation_id" integer,
    "vigilance_froid_id" integer,
    "vigilance_froid_recommandation_id" integer,
    "vigilance_avalanches_id" integer,
    "vigilance_avalanches_recommandation_id" integer,
    "vigilance_vagues_id" integer,
    "vigilance_vagues_recommandation_id" integer,
    "vigilance_globale_id" integer,
    "vigilance_globale_recommandation_id" integer,
    "recommandation_indice_uv_id" integer,
    "indice_uv_zone_id" integer,
    "indice_uv_date" "date",
    "show_indice_uv" boolean,
    "indice_uv_label" character varying,
    "indice_uv_value" integer,
    "show_qa" boolean,
    "show_vigilance" boolean
);


--
-- Name: newsletter_hebdo_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."newsletter_hebdo_template" (
    "id" integer NOT NULL,
    "sib_id" integer NOT NULL,
    "ordre" integer NOT NULL,
    "periode_validite" "daterange" NOT NULL,
    "deplacement" character varying[],
    "activites" character varying[],
    "enfants" character varying[],
    "chauffage" character varying[],
    "animaux_domestiques" character varying[],
    "indicateurs" character varying[],
    "indicateurs_exclus" character varying[]
);


--
-- Name: newsletter_hebdo_template_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."newsletter_hebdo_template_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: newsletter_hebdo_template_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."newsletter_hebdo_template_id_seq" OWNED BY "public"."newsletter_hebdo_template"."id";


--
-- Name: newsletter_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."newsletter_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: newsletter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."newsletter_id_seq" OWNED BY "public"."newsletter"."id";


--
-- Name: queue_id_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."queue_id_sequence"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recommandation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."recommandation" (
    "id" integer NOT NULL,
    "recommandation" character varying,
    "precisions" character varying,
    "qa_mauvaise" boolean,
    "menage" boolean,
    "bricolage" boolean,
    "jardinage" boolean,
    "balcon_terasse" boolean,
    "velo_trott_skate" boolean,
    "transport_en_commun" boolean,
    "voiture" boolean,
    "activite_physique" boolean,
    "enfants" boolean,
    "personnes_sensibles" boolean,
    "sources" character varying,
    "categorie" character varying,
    "automne" boolean,
    "hiver" boolean,
    "ete" boolean,
    "qa_bonne" boolean,
    "ozone" boolean,
    "particules_fines" boolean,
    "dioxyde_azote" boolean,
    "dioxyde_soufre" boolean,
    "episode_pollution" boolean,
    "autres" boolean,
    "status" character varying,
    "printemps" boolean,
    "animal_de_compagnie" boolean,
    "type" character varying,
    "min_raep" integer,
    "chauffage" character varying[],
    "ordre" integer,
    "potentiel_radon" integer[],
    "vigilance_couleur_ids" integer[],
    "vigilance_phenomene_ids" integer[],
    "min_indice_uv" integer,
    "qa_evenement" boolean
);


--
-- Name: recommandation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."recommandation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recommandation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."recommandation_id_seq" OWNED BY "public"."recommandation"."id";


--
-- Name: task_id_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."task_id_sequence"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: taskset_id_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."taskset_id_sequence"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: webpush_subscription_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."webpush_subscription_info" (
    "id" integer NOT NULL,
    "data" "jsonb",
    "inscription_id" integer
);


--
-- Name: webpush_subscription_info_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."webpush_subscription_info_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: webpush_subscription_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."webpush_subscription_info_id_seq" OWNED BY "public"."webpush_subscription_info"."id";


--
-- Name: bassin_d_air id; Type: DEFAULT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."bassin_d_air" ALTER COLUMN "id" SET DEFAULT "nextval"('"indice_schema"."bassin_d_air_id_seq"'::"regclass");


--
-- Name: commune id; Type: DEFAULT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."commune" ALTER COLUMN "id" SET DEFAULT "nextval"('"indice_schema"."commune_id_seq"'::"regclass");


--
-- Name: departement id; Type: DEFAULT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."departement" ALTER COLUMN "id" SET DEFAULT "nextval"('"indice_schema"."departement_id_seq"'::"regclass");


--
-- Name: epci id; Type: DEFAULT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."epci" ALTER COLUMN "id" SET DEFAULT "nextval"('"indice_schema"."epci_id_seq"'::"regclass");


--
-- Name: episode_history id; Type: DEFAULT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."episode_history" ALTER COLUMN "id" SET DEFAULT "nextval"('"indice_schema"."episode_history_id_seq"'::"regclass");


--
-- Name: indice_history id; Type: DEFAULT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."indice_history" ALTER COLUMN "id" SET DEFAULT "nextval"('"indice_schema"."indice_history_id_seq"'::"regclass");


--
-- Name: raep id; Type: DEFAULT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."raep" ALTER COLUMN "id" SET DEFAULT "nextval"('"indice_schema"."raep_id_seq"'::"regclass");


--
-- Name: region id; Type: DEFAULT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."region" ALTER COLUMN "id" SET DEFAULT "nextval"('"indice_schema"."region_id_seq"'::"regclass");


--
-- Name: vigilance_meteo id; Type: DEFAULT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."vigilance_meteo" ALTER COLUMN "id" SET DEFAULT "nextval"('"indice_schema"."vigilance_meteo_id_seq"'::"regclass");


--
-- Name: zone id; Type: DEFAULT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."zone" ALTER COLUMN "id" SET DEFAULT "nextval"('"indice_schema"."zone_id_seq"'::"regclass");


--
-- Name: avis id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."avis" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."avis_id_seq"'::"regclass");


--
-- Name: inscription id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."inscription" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."inscription_id_seq"'::"regclass");


--
-- Name: newsletter id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."newsletter_id_seq"'::"regclass");


--
-- Name: newsletter_hebdo_template id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter_hebdo_template" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."newsletter_hebdo_template_id_seq"'::"regclass");


--
-- Name: recommandation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."recommandation" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."recommandation_id_seq"'::"regclass");


--
-- Name: webpush_subscription_info id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."webpush_subscription_info" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."webpush_subscription_info_id_seq"'::"regclass");


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."alembic_version"
    ADD CONSTRAINT "alembic_version_pkc" PRIMARY KEY ("version_num");


--
-- Name: bassin_d_air bassin_d_air_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."bassin_d_air"
    ADD CONSTRAINT "bassin_d_air_pkey" PRIMARY KEY ("id");


--
-- Name: commune commune_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."commune"
    ADD CONSTRAINT "commune_pkey" PRIMARY KEY ("id");


--
-- Name: departement departement_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."departement"
    ADD CONSTRAINT "departement_pkey" PRIMARY KEY ("id");


--
-- Name: epci epci_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."epci"
    ADD CONSTRAINT "epci_pkey" PRIMARY KEY ("id");


--
-- Name: episode_history episode_history_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."episode_history"
    ADD CONSTRAINT "episode_history_pkey" PRIMARY KEY ("id");


--
-- Name: episode_pollution episode_pollution_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."episode_pollution"
    ADD CONSTRAINT "episode_pollution_pkey" PRIMARY KEY ("zone_id", "date_ech", "date_dif", "code_pol");


--
-- Name: indiceATMO indiceATMO_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."indiceATMO"
    ADD CONSTRAINT "indiceATMO_pkey" PRIMARY KEY ("zone_id", "date_ech", "date_dif");


--
-- Name: indice_history indice_history_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."indice_history"
    ADD CONSTRAINT "indice_history_pkey" PRIMARY KEY ("id");


--
-- Name: indice_uv indice_uv_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."indice_uv"
    ADD CONSTRAINT "indice_uv_pkey" PRIMARY KEY ("zone_id", "date");


--
-- Name: potentiel_radon potentiel_radon_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."potentiel_radon"
    ADD CONSTRAINT "potentiel_radon_pkey" PRIMARY KEY ("zone_id");


--
-- Name: raep raep_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."raep"
    ADD CONSTRAINT "raep_pkey" PRIMARY KEY ("id");


--
-- Name: raep raep_unique_zoneid_validity; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."raep"
    ADD CONSTRAINT "raep_unique_zoneid_validity" UNIQUE ("zone_id", "validity");


--
-- Name: region region_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."region"
    ADD CONSTRAINT "region_pkey" PRIMARY KEY ("id");


--
-- Name: vigilance_meteo vigilance_meteo_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."vigilance_meteo"
    ADD CONSTRAINT "vigilance_meteo_pkey" PRIMARY KEY ("id");


--
-- Name: zone zone_pkey; Type: CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."zone"
    ADD CONSTRAINT "zone_pkey" PRIMARY KEY ("id");


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."alembic_version"
    ADD CONSTRAINT "alembic_version_pkc" PRIMARY KEY ("version_num");


--
-- Name: avis avis_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."avis"
    ADD CONSTRAINT "avis_pkey" PRIMARY KEY ("id");


--
-- Name: celery_taskmeta celery_taskmeta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."celery_taskmeta"
    ADD CONSTRAINT "celery_taskmeta_pkey" PRIMARY KEY ("id");


--
-- Name: celery_taskmeta celery_taskmeta_task_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."celery_taskmeta"
    ADD CONSTRAINT "celery_taskmeta_task_id_key" UNIQUE ("task_id");


--
-- Name: celery_tasksetmeta celery_tasksetmeta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."celery_tasksetmeta"
    ADD CONSTRAINT "celery_tasksetmeta_pkey" PRIMARY KEY ("id");


--
-- Name: celery_tasksetmeta celery_tasksetmeta_taskset_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."celery_tasksetmeta"
    ADD CONSTRAINT "celery_tasksetmeta_taskset_id_key" UNIQUE ("taskset_id");


--
-- Name: inscription inscription_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."inscription"
    ADD CONSTRAINT "inscription_pkey" PRIMARY KEY ("id");


--
-- Name: kombu_message kombu_message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."kombu_message"
    ADD CONSTRAINT "kombu_message_pkey" PRIMARY KEY ("id");


--
-- Name: kombu_queue kombu_queue_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."kombu_queue"
    ADD CONSTRAINT "kombu_queue_name_key" UNIQUE ("name");


--
-- Name: kombu_queue kombu_queue_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."kombu_queue"
    ADD CONSTRAINT "kombu_queue_pkey" PRIMARY KEY ("id");


--
-- Name: newsletter_hebdo_template newsletter_hebdo_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter_hebdo_template"
    ADD CONSTRAINT "newsletter_hebdo_template_pkey" PRIMARY KEY ("id");


--
-- Name: newsletter newsletter_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_pkey" PRIMARY KEY ("id");


--
-- Name: recommandation recommandation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."recommandation"
    ADD CONSTRAINT "recommandation_pkey" PRIMARY KEY ("id");


--
-- Name: webpush_subscription_info webpush_subscription_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."webpush_subscription_info"
    ADD CONSTRAINT "webpush_subscription_info_pkey" PRIMARY KEY ("id");


--
-- Name: raep_zone_validity_idx; Type: INDEX; Schema: indice_schema; Owner: -
--

CREATE INDEX "raep_zone_validity_idx" ON "indice_schema"."raep" USING "btree" ("zone_id", "validity");


--
-- Name: vigilance_zone_phenomene_date_export_idx; Type: INDEX; Schema: indice_schema; Owner: -
--

CREATE INDEX "vigilance_zone_phenomene_date_export_idx" ON "indice_schema"."vigilance_meteo" USING "btree" ("zone_id", "phenomene_id", "date_export");


--
-- Name: ix_kombu_message_timestamp; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_kombu_message_timestamp" ON "public"."kombu_message" USING "btree" ("timestamp");


--
-- Name: ix_kombu_message_timestamp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_kombu_message_timestamp_id" ON "public"."kombu_message" USING "btree" ("timestamp", "id");


--
-- Name: ix_kombu_message_visible; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_kombu_message_visible" ON "public"."kombu_message" USING "btree" ("visible");


--
-- Name: ix_newsletter_inscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_newsletter_inscription_id" ON "public"."newsletter" USING "btree" ("inscription_id");


--
-- Name: ix_newsletter_short_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ix_newsletter_short_id" ON "public"."newsletter" USING "btree" ("short_id");


--
-- Name: ix_newsletter_webpush_subscription_info_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_newsletter_webpush_subscription_info_id" ON "public"."newsletter" USING "btree" ("webpush_subscription_info_id");


--
-- Name: ix_webpush_subscription_info_inscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_webpush_subscription_info_inscription_id" ON "public"."webpush_subscription_info" USING "btree" ("inscription_id");


--
-- Name: newsletter_mail_list_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "newsletter_mail_list_id" ON "public"."newsletter" USING "btree" ("mail_list_id");


--
-- Name: episode_pollution indice_schema.check_new_episode; Type: TRIGGER; Schema: indice_schema; Owner: -
--

CREATE TRIGGER "indice_schema.check_new_episode" BEFORE INSERT OR UPDATE ON "indice_schema"."episode_pollution" FOR EACH ROW EXECUTE FUNCTION "indice_schema"."check_zone"();


--
-- Name: indiceATMO indice_schema.check_new_indice; Type: TRIGGER; Schema: indice_schema; Owner: -
--

CREATE TRIGGER "indice_schema.check_new_indice" BEFORE INSERT OR UPDATE ON "indice_schema"."indiceATMO" FOR EACH ROW EXECUTE FUNCTION "indice_schema"."check_zone"();


--
-- Name: bassin_d_air bassin_d_air_zone_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."bassin_d_air"
    ADD CONSTRAINT "bassin_d_air_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: commune commune_epci_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."commune"
    ADD CONSTRAINT "commune_epci_id_fkey" FOREIGN KEY ("epci_id") REFERENCES "indice_schema"."epci"("id");


--
-- Name: commune commune_zone_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."commune"
    ADD CONSTRAINT "commune_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: commune commune_zone_pollution_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."commune"
    ADD CONSTRAINT "commune_zone_pollution_id_fkey" FOREIGN KEY ("zone_pollution_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: commune departement_commune_id_fk; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."commune"
    ADD CONSTRAINT "departement_commune_id_fk" FOREIGN KEY ("departement_id") REFERENCES "indice_schema"."departement"("id");


--
-- Name: departement departement_region_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."departement"
    ADD CONSTRAINT "departement_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "indice_schema"."region"("id");


--
-- Name: departement departement_zone_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."departement"
    ADD CONSTRAINT "departement_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: epci epci_departement_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."epci"
    ADD CONSTRAINT "epci_departement_id_fkey" FOREIGN KEY ("departement_id") REFERENCES "indice_schema"."departement"("id");


--
-- Name: epci epci_zone_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."epci"
    ADD CONSTRAINT "epci_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: episode_pollution episode_pollution_zone_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."episode_pollution"
    ADD CONSTRAINT "episode_pollution_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: indiceATMO indiceATMO_zone_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."indiceATMO"
    ADD CONSTRAINT "indiceATMO_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: indice_uv indice_uv_zone_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."indice_uv"
    ADD CONSTRAINT "indice_uv_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: potentiel_radon potentiel_radon_zone_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."potentiel_radon"
    ADD CONSTRAINT "potentiel_radon_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: raep raep_zone_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."raep"
    ADD CONSTRAINT "raep_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: region region_zone_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."region"
    ADD CONSTRAINT "region_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: vigilance_meteo vigilance_meteo_zone_id_fkey; Type: FK CONSTRAINT; Schema: indice_schema; Owner: -
--

ALTER TABLE ONLY "indice_schema"."vigilance_meteo"
    ADD CONSTRAINT "vigilance_meteo_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "indice_schema"."zone"("id");


--
-- Name: kombu_message FK_kombu_message_queue; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."kombu_message"
    ADD CONSTRAINT "FK_kombu_message_queue" FOREIGN KEY ("queue_id") REFERENCES "public"."kombu_queue"("id");


--
-- Name: newsletter fk_newsletter_recommandation_qa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "fk_newsletter_recommandation_qa" FOREIGN KEY ("recommandation_qa_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter fk_newsletter_recommandation_raep; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "fk_newsletter_recommandation_raep" FOREIGN KEY ("recommandation_raep_id") REFERENCES "public"."recommandation"("id");


--
-- Name: inscription inscription_commune_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."inscription"
    ADD CONSTRAINT "inscription_commune_fk" FOREIGN KEY ("commune_id") REFERENCES "indice_schema"."commune"("id");


--
-- Name: newsletter newsletter_fk_vigilance_avalanches_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_avalanches_id" FOREIGN KEY ("vigilance_avalanches_id") REFERENCES "indice_schema"."vigilance_meteo"("id");


--
-- Name: newsletter newsletter_fk_vigilance_avalanches_recommandation_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_avalanches_recommandation_id" FOREIGN KEY ("vigilance_avalanches_recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_fk_vigilance_canicule_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_canicule_id" FOREIGN KEY ("vigilance_canicule_id") REFERENCES "indice_schema"."vigilance_meteo"("id");


--
-- Name: newsletter newsletter_fk_vigilance_canicule_recommandation_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_canicule_recommandation_id" FOREIGN KEY ("vigilance_canicule_recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_fk_vigilance_crues_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_crues_id" FOREIGN KEY ("vigilance_crues_id") REFERENCES "indice_schema"."vigilance_meteo"("id");


--
-- Name: newsletter newsletter_fk_vigilance_crues_recommandation_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_crues_recommandation_id" FOREIGN KEY ("vigilance_crues_recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_fk_vigilance_froid_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_froid_id" FOREIGN KEY ("vigilance_froid_id") REFERENCES "indice_schema"."vigilance_meteo"("id");


--
-- Name: newsletter newsletter_fk_vigilance_froid_recommandation_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_froid_recommandation_id" FOREIGN KEY ("vigilance_froid_recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_fk_vigilance_neige_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_neige_id" FOREIGN KEY ("vigilance_neige_id") REFERENCES "indice_schema"."vigilance_meteo"("id");


--
-- Name: newsletter newsletter_fk_vigilance_neige_recommandation_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_neige_recommandation_id" FOREIGN KEY ("vigilance_neige_recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_fk_vigilance_orages_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_orages_id" FOREIGN KEY ("vigilance_orages_id") REFERENCES "indice_schema"."vigilance_meteo"("id");


--
-- Name: newsletter newsletter_fk_vigilance_orages_recommandation_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_orages_recommandation_id" FOREIGN KEY ("vigilance_orages_recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_fk_vigilance_pluie_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_pluie_id" FOREIGN KEY ("vigilance_pluie_id") REFERENCES "indice_schema"."vigilance_meteo"("id");


--
-- Name: newsletter newsletter_fk_vigilance_pluie_recommandation_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_pluie_recommandation_id" FOREIGN KEY ("vigilance_pluie_recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_fk_vigilance_vagues_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_vagues_id" FOREIGN KEY ("vigilance_vagues_id") REFERENCES "indice_schema"."vigilance_meteo"("id");


--
-- Name: newsletter newsletter_fk_vigilance_vagues_recommandation_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_vagues_recommandation_id" FOREIGN KEY ("vigilance_vagues_recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_fk_vigilance_vent_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_vent_id" FOREIGN KEY ("vigilance_vent_id") REFERENCES "indice_schema"."vigilance_meteo"("id");


--
-- Name: newsletter newsletter_fk_vigilance_vent_recommandation_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_fk_vigilance_vent_recommandation_id" FOREIGN KEY ("vigilance_vent_recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_indice_uv_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_indice_uv_fk" FOREIGN KEY ("indice_uv_zone_id", "indice_uv_date") REFERENCES "indice_schema"."indice_uv"("zone_id", "date");


--
-- Name: newsletter newsletter_inscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_inscription_id_fkey" FOREIGN KEY ("inscription_id") REFERENCES "public"."inscription"("id");


--
-- Name: newsletter newsletter_newsletter_hebdo_template_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_newsletter_hebdo_template_id_fk" FOREIGN KEY ("newsletter_hebdo_template_id") REFERENCES "public"."newsletter_hebdo_template"("id");


--
-- Name: newsletter newsletter_recommandation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_recommandation_id_fkey" FOREIGN KEY ("recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_recommandation_indice_uv_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_recommandation_indice_uv_id_fk" FOREIGN KEY ("recommandation_indice_uv_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_vigilance_meteo_globale_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_vigilance_meteo_globale_id_fk" FOREIGN KEY ("vigilance_globale_id") REFERENCES "indice_schema"."vigilance_meteo"("id");


--
-- Name: newsletter newsletter_vigilance_meteo_globale_recommandation_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_vigilance_meteo_globale_recommandation_id_fk" FOREIGN KEY ("vigilance_globale_recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter newsletter_webpush_subscription_info; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "newsletter_webpush_subscription_info" FOREIGN KEY ("webpush_subscription_info_id") REFERENCES "public"."webpush_subscription_info"("id");


--
-- Name: newsletter recommandation_episode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "recommandation_episode_fkey" FOREIGN KEY ("recommandation_id") REFERENCES "public"."recommandation"("id");


--
-- Name: newsletter recommandation_episode_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."newsletter"
    ADD CONSTRAINT "recommandation_episode_id_fkey" FOREIGN KEY ("recommandation_episode_id") REFERENCES "public"."recommandation"("id");


--
-- Name: webpush_subscription_info webpush_subscription_info_inscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."webpush_subscription_info"
    ADD CONSTRAINT "webpush_subscription_info_inscription_id_fkey" FOREIGN KEY ("inscription_id") REFERENCES "public"."inscription"("id");


--
-- PostgreSQL database dump complete
--

