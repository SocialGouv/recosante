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




insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4843, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Ne pas sortir en montagne
- Respecter les consignes de sécurité en vigueur dans les stations de montagne 
- Se tenir informé auprès des autorités', 'Météo France', 'published', false, 'vigilance_meteo', false, '{3}', '{8}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4853, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- S’éloigner des cours d''eau et des ponts, et rejoindre un point haut 
- Ne pas s’engager sur une route immergée, même partiellement
- Eviter de se déplacer et se tenir informé des conditions météo
- Ne pas descendre dans les sous-sols
- Mettre ses biens hors d''eau et localiser son kit d''urgence', 'Météo France', 'published', false, 'vigilance_meteo', false, '{3}', '{4}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4855, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Boire de l''eau plusieurs fois par jour
- Se mouiller le corps plusieurs fois par jour à l’aide d’un brumisateur, d’un gant de toilette ou en prenant des douches ou des bains tièdes.
- Ne pas sortir aux heures les plus chaudes (11h-21h).
- En cas de sortie, porter un chapeau et des vêtements légers. Limiter les activités physiques et sportives.
- Pendant la journée, fermer volets, rideaux et fenêtres. Aérer la nuit.', 'Météo france', 'published', false, 'vigilance_meteo', false, '{3}', '{6}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4838, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '', '', 'deleted', false, 'vigilance_meteo', false, '{1}', '{1}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4834, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Il n''y a pas de pollens dans l''air aujourd''hui, aucune gêne particulière n''est à prévoir', 'N/A', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4566, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ 91% des produits testés dans une étude sur les produits ménagers émettent
du formaldéhyde, une substance cancérogène avérée pour l’homme, d’après le
CIRC (Centre international de recherche sur le cancer).

💡 Eviter les produits suivants : eau de javel, déboucheurs de canalisation,
vaporisateurs (décapants pour four, lave-vitres, désodorisants,
assainissants). [Pour en savoir plus](https://huit.re/infographie-ademe)', false, true, NULL, false, 'Pour les tâches ménagères, limiter le nombre de produits ménagers, respecter les doses et ne jamais faire de mélange', '"ADEME 
https://multimedia.ademe.fr/infographies/infographie_produits_menagers/index.html"', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4568, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ L''aération permet disperser les polluants de l''air intérieur issus des produits ménagers, et d''évacuer l''humidité associée au nettoyage.

💡 Les produits ménagers courants contiennent des substances issues de la pétrochimie nocives pour la santé. 91% des produits testés dans une étude sur les produits ménagers émettent du formaldéhyde, une substance cancérogène avérée pour l’homme, d’après le CIRC (Centre international de recherche sur le cancer)[Pour en savoir
plus.](https://huit.re/infographie-ademe)', false, true, NULL, false, 'Aérer très largement pendant et après les activités de nettoyage.', '"ADEME 
https://multimedia.ademe.fr/infographies/infographie_produits_menagers/index.html"', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4849, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- S’éloigner des cours d''eau et des points bas en s’abritant à l’étage ou en rejoignant un point haut 
- Ne pas s’engager en voiture sur une route immergée, même partiellement
- Eviter les déplacements et se tenir informé et surveiller la montée des eaux                                               
- Ne pas descendre dans les sous-sols
- Mettre ses biens hors d''eau et localiser un kit d''urgence', '', 'published', false, 'vigilance_meteo', false, '{3}', '{2}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4856, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Boire de l''eau plusieurs fois par jour
- Se mouiller le corps plusieurs fois par jour à l’aide d’un brumisateur, d’un gant de toilette ou en prenant des douches ou des bains tièdes.
- Ne pas sortir aux heures les plus chaudes (11h-21h).
- En cas de sortie, porter un chapeau et des vêtements légers. Limiter les activités physiques et sportives.
- Pendant la journée, fermer volets, rideaux et fenêtres. Aérer la nuit.
En cas de malaise ou de troubles du comportement, appeler un médecin.
Pour prévenir les feux de végétation, ne pas utiliser de matériel susceptible de produire des étincelles et veiller à ne pas avoir de comportement pouvant favoriser les départs de feux (cigarette, barbecue, etc.).', 'Météo france', 'published', false, 'vigilance_meteo', false, '{4}', '{6}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4790, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, true, 'Même lorsque la qualité de l''air est mauvaise, il est nécessaire d''aérer son
logement deux fois par jour pour faire circuler l''air.', 'Infographies MSS : 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_generale.pdf 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_enfants.pdf
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_age.pdf', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, true, false, 'Air extérieur', '{}', false, false, false, NULL, true, false, 4667, true, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Dans un appartement, il est important de veiller au taux d''humidité dans
l''air afin d''éviter le développement de moisissures.

💡 Les moisissures ont des effets néfastes sur la santé et peuvent favoriser le
déclenchement de l''asthme et des allergies.', false, true, false, false, 'En cas de fortes chaleurs, il est conseillé d''arroser ses plantes le soir pour
éviter l''évaporation de l''eau.', 'https://www.hawa-mayotte.fr/actualite/les-bonnes-mani-air-a-adopter-dans-son-jardin', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, false, false, false, 4673, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Lors d’une séance de sport d''endurance, la quantité d’air inhalée augmente.
De plus, la respiration se fait le plus souvent par la bouche : l’air aspiré
échappe donc au filtre naturel des voies nasales. Il est donc important de
bien choisir le lieux de sa pratique sportive.

💡 En ville, en choisissant où l’on pratique son activité sportive, les
concentrations moyennes annuelles en polluants peuvent être de 20 à 40 %
(selon les polluants) plus faibles que lorsque l’on est proche des axes de
circulation.', false, true, false, false, 'Pour faire du sport, privilégier les parcs, les zones piétonnes, et les rues
peu circulantes.', 'https://www.atmo-auvergnerhonealpes.fr/article/activites-physiques-et-qualite-de-lair-bien-respirer-pour-bien-bouger', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4848, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- En cas de sortie, porter des habits chauds, de plusieurs couches de vêtements, avec une couche extérieure imperméable au vent et à l''eau.
- Se couvrir le nez et la bouche pour respirer de l’air moins froid. 
- Mettre de bonnes chaussures pour éviter les chutes. 
- Avant chaque déplacement, se renseigner sur la météo et l’état des routes.
- En cas de neige ou au verglas, ne prendre son véhicule qu''en cas d''obligation forte. 
- Eviter les efforts brusques en période de froid extrême, même en bonne santé.  Suite à une exposition au grand froid, assurer un repos prolongé, avec douche ou bain chaud. 
Continuer de manger convenablement et prendre une boisson chaude, sans alcool.
- Eviter de sortir les nourrissons et les jeunes enfants, même bien protégés.', '', 'published', false, 'vigilance_meteo', false, '{4}', '{7}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4854, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Rester chez soi et se tenir informé auprès des autorités
- Ne pas utiliser sa voiture
- S’éloigner des cours d''eau, des points bas et des ponts et rejoindre  le point le plus haut possible
- Se réfugier en étage, en dernier recours sur le toit, et ne pas descendre dans les sous-sols
- Evacuer uniquement sur ordre des autorités en emportant mon kit d''urgence', 'météo france', 'published', false, 'vigilance_meteo', false, '{4}', '{4}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4569, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les produits d''entretien issus de l''industrie ont des effets néfastes sur
la santé humaine, et sur l''environnement (pollution de l''air et de
l''eau).💡Utiliser par exemple le savon noir, le bicarbonate de soude, le
vinaigre blanc, le citron... Attention, ces produits sont acides ou basiques
et doivent quand même être utilisés avec précaution. [Plus
d''informations](https://huit.re/infographie-ademe)', false, true, NULL, false, 'Utiliser des produits d''entretiens simples pour le ménage : savon noir, vinaigre, bicarbonate de soude…', '"ADEME 
https://multimedia.ademe.fr/infographies/infographie_produits_menagers/index.html"', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4829, false, false, NULL, 1, NULL, false, false, false, '{}', '', false, false, NULL, false, 'En cas d''allergie diagnostiquée, rincer ses cheveux après une activité
physique en extérieur afin d’éliminer les pollens.', 'RNSA', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4845, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Limiter ses déplacements 
- Sur la route, munir son véhicule d''équipements spéciaux, de vivres et de couvertures 
- Veiller à ce les groupes électrogènes soient installés à l''extérieur de la maison pour éviter une intoxication au monoxyde de carbone en cas de coupure de courant 
- Se tenir informé auprès des autorités', 'Météo France', 'published', false, 'vigilance_meteo', false, '{3}', '{5}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4852, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Ne pas prendre  la mer et s’éloigner des côtes et des estuaires
- Localiser son kit d''urgence
- Surveiller la montée des eaux et protéger les biens qui peuvent être inondés
- Rejoindre le plus haut point possible ou se réfugier en étage, en dernier recours sur le toit', 'Météo France', 'published', false, 'vigilance_meteo', false, '{4}', '{9}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4836, false, false, NULL, 4, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Pendant les pics polliniques, éviter les efforts physiques intenses en plein air ou bien les réaliser à l''intérieur.', 'https://www.pollenundallergie.ch/infos-sur-pollens-et-allergies/conseils-prevention/?oid=1881&lang=fr', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4593, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Dans la majorité des logements, l’air extérieur est introduit par les pièces sèches (séjour et chambres) et est évacué par les pièces humides (cuisine, salle de bains et WC), de façon naturelle ou mécanique. Pour que cette circulation de l’air puisse se faire, les portes intérieures doivent être détalonnées, c’est à-dire qu’il doit y avoir un espace vide d''environ 2 cm sous les portes. 
💡 Alternative possible : fermer les portes le moins possible.', false, true, NULL, false, 'Il est déconseillé d''obstruer l''espace présent sous les portes à l''intérieur de son logement.', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison
 Guide "ventilation" ADEME : https://www.ademe.fr/ventilation-indispensable-logement-confortable-sain', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', NULL, false, false, true, true, false, false, 4745, false, false, NULL, NULL, NULL, true, false, true, '{}', '', false, false, NULL, false, '* Privilégier des sorties plus brèves et celles qui demandent le moins d''effort.
  * Éviter les sorties durant l''après-midi lorsque l''ensoleillement est maximum.
  * Éviter les activités physiques et sportives intenses (dont les compétitions) en plein air ; celles peu intenses à l''intérieur peuvent être maintenues.
  * En cas de gêne respiratoire ou cardiaque, prendre conseil auprès d''un professionnel de santé.
  * Prendre conseil auprès de votre médecin pour savoir si votre traitement médical doit être adapté le cas échéant.', 'Arrêté du 13 mars 2018', 'deleted', false, 'episode_pollution', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4850, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Rester chez soi et se tenir informé auprès des autorités 
- Ne pas utiliser sa voiture et éviter les déplacements
- S’éloigner des cours d''eau et des points bas en s’abritant à l’étage ou en rejoignant un point haut
- Se réfugier en étage, ou en dernier recours sur le toit
- Evacuer uniquement sur ordre des autorités en emportant un kit d''urgence', 'Météo France', 'published', false, 'vigilance_meteo', false, '{4}', '{2}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4824, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, true, 'Faire du sport le matin tôt, ou en soirée afin d’éviter les heures de pointe du trafic automobile. Éviter les séances de sport longues et intenses.', 'ATMO Auvergne-Rhône-Alpes', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4601, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ L’air intérieur peut être plus pollué que l’air extérieur. La pollution
émise dans les lieux clos (peintures, sols, matériels sportifs...) s’ajoute
aux polluants provenant de l’extérieur.

💡 Pendant l''effort, le volume d''air brassé par les poumons passe d''environ 6/8
litres par minute au repos à 80/150 litres par minute, selon l''intensité de
l''exercice. Aérer son logement pour respirer un air sain !', false, true, false, false, 'En cas d''activité physique intérieure, aérer son logement 10 minutes avant et
après.', 'https://www.anses.fr/fr/content/qualit%C3%A9-de-l%E2%80%99air-int%C3%A9rieur', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4609, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Un logement surchauffé est un logement trop sec, ce qui peut entrainer
l''assèchement des muqueuse des voies respiratoires.

💡 1° degré en plus = 7% de consommation en plus. N''oubliez pas de baisser le
chauffage quand vous vous absentez et lors de beaux jours au printemps et à
l’automne. [Plus d''informations](https://huit.re/chauffage)', false, true, NULL, false, 'Il est conseillé de chauffer son logement entre 19 et 21 °C dans les pièces de
vie (salon, salle à manger...), et à 17 °C dans les chambres à coucher.', 'https://multimedia.ademe.fr/infographies/infographie_mieux_se_chauffer/', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4611, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les Composés Organiques Volatils (COV) sont des substances chimiques qui
s''évaporent plus ou moins rapidement dans l''air. Ils peuvent provoquer des
troubles respiratoires, des irritations des yeux, du nez et de la gorge, des
réactions allergiques…

💡 Conserver les produits en spray, les diffuseurs d''huiles essentielles et les
parfums d''intérieur hors de portée des enfants.', false, true, NULL, false, 'Eviter la vaporisation de produits en spray qui dégagent des COV (Composés
Organiques Volatils) nocifs pour la santé.', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4701, false, false, NULL, NULL, NULL, false, false, false, '{}', 'ℹ️ La poussière peut entraîner des allergies ou de l''asthme chez les personnes
sensibles.', false, true, NULL, false, 'Il est conseillé de passer l''aspirateur deux fois par semaine dans son
logement pour réduire la poussière.', 'OQAI, "les bons gestes pour un bon air".', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, true, false, false, '', NULL, true, true, false, true, false, false, 4747, false, false, NULL, NULL, NULL, false, true, false, '{}', '', NULL, false, NULL, false, '* Privilégier des sorties plus brèves et celles qui demandent le moins d''effort.
  * Réduire, voire reporter, les activités physiques et sportives intenses (dont les compétitions).
  * En cas de gêne respiratoire ou cardiaque, prendre conseil auprès d''un professionnel de santé.', 'Arrêté du 13 mars 2018', 'deleted', false, 'episode_pollution', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4851, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Ne pas prendre  la mer et s’éloigner des côtes et des estuaires
- Se tenir informé et localiser son kit d''urgence
- Surveiller la montée des eaux et protéger les biens qui peuvent être inondés
- Rejoindre le plus haut point possible ou se réfugier en étage, en dernier recours sur le toit', 'Météo France', 'published', false, 'vigilance_meteo', false, '{3}', '{9}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4624, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Il est conseillé de privilégier l''aspirateur au balai, car il remet moins
de particules en suspension et d’allergènes dans l’air intérieur.

💡Si vous ne disposez pas d’un aspirateur, il vaut mieux privilégier un
nettoyage humide qu’un balayage simple.', false, true, NULL, false, 'Aspirer régulièrement la literie, les tissus d''ameublements et de décoration (canapé, tapis, moquette, rideaux, etc.).', 'https://www.airparif.asso.fr/pollution/air-interieur-generalites 
ATMO BFC :https://www.atmo-bfc.org/qui-sommes-nous/actualites/filtre-hepa-pas-le-genre-a-remuer-la-poussiere', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Activité physique', NULL, false, false, false, NULL, false, false, 4671, false, false, NULL, 0, NULL, false, false, false, '{}', '💡Dans une étude réalisée en 2015, l’observatoire régional de surveillance de
la qualité de l’air en Occitanie a démontré que le choix d''emprunter un axe
avec peu de trafic routier a permis de réduire l''exposition moyenne du
cycliste ou du piéton d’environ 40 % pour le dioxyde d''azote (NO2) et de 50 %
pour les particules PM10.', false, true, NULL, true, 'Pour vos activités physiques, éviter les zones qui concentrent les polluants :
les grands axes de circulation, les rues étroites et bordées d''immeubles
hauts...', '', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Activité extérieure', '{}', false, false, false, NULL, false, false, 4632, true, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Tout au long de l''année, il est conseillé de maintenir l’herbe courte dans votre jardin par une tonte régulière. En période pollinisation, tondre son jardin remet les pollens en suspension dans l''air.

💡 Durant les tontes, fermer les fenêtres de votre logement.', false, false, NULL, false, 'Lors du jardinage, éviter de tondre soi-même la pelouse ou de rester à proximité de la tonte si on est allergique.', 'ATMO Grand Est

ATMO : Nouvelle aquitaine
https://www.atmo-nouvelleaquitaine.org/article/les-pollens

https://www.pollenundallergie.ch/infos-sur-pollens-et-allergies/conseils-prevention/?oid=1881&lang=fr', 'hidden', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4791, false, false, NULL, 1, NULL, false, false, false, '{}', '', false, false, NULL, false, 'En cas de gêne répétitive et saisonnière liée aux symptômes suivants (crise
d''éternuement, nez parfois bouché ou qui coule clair, yeux rouges qui
larmoient) et de fatigue inhabituelle, il peut s''agir d’une allergie aux
pollens. Prendre conseil auprès d''un professionnel de santé.', 'MSS', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4607, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Couper son moteur lorsqu’on s’arrête permet de réduire le bruit, la
pollution et de réaliser des économies de carburant.', false, true, false, true, 'Pour limiter la pollution de l’air, éteindre le moteur de sa voiture dès qu''on s''arrête quelques instants.', 'https://www.airparif.asso.fr/_pdf/les-petits-gestes-au-quotidien.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{"bois"}', false, false, false, false, false, true, 4614, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ La combustion de biomasse (feux de cheminée, feux agricoles et feux de
jardins), comme toute combustion, émet divers polluants atmosphériques.

💡Les émissions sont majoritairement issues des appareils non performants
(foyers fermés et poêles anciens ou foyers ouverts) du parc domestique.', false, false, false, true, 'L''hiver, en cas de qualité de l''air mauvaise, éviter les feux de cheminée
d''agrément.', 'ademe : https://www.ademe.fr/expertises/energies-renouvelables-enr-production-reseaux-stockage/passer-a-laction/produire-chaleur/dossier/bois-biomasse/bois-energie-qualite-lair', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4621, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Dans les tunnels, les concentrations de polluants à l’intérieur de
l’habitacle du véhicule sont en moyenne 2 fois plus élevées que celles en-
dehors des tunnels. Sur les axes majeurs, elles sont 1,6 fois plus élevées que
sur les axes moins fréquentés.

💡[En savoir plus](l.incubateur.net/oWVM)', false, true, false, true, 'En voiture, si possible utiliser des applications GPS proposant des itinéraires moins embouteillés.', 'https://www.airparif.asso.fr/en-voiture#:~:text=Dans%20les%20tunnels%2C%20les%20concentrations,sur%20les%20axes%20moins%20fr%C3%A9quent%C3%A9s.', 'hidden', false, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, true, 'Air intérieur', '{}', false, false, true, NULL, false, false, 4636, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les produits utilisés pour le bricolage contiennent des substances toxiques
pour la santé.

💡 Ne pas oublier d''aérer pendant toute la durée des travaux et plusieurs
semaines après.', false, true, NULL, false, 'Lors de travaux de bricolage, refermer les récipients pour éviter qu’ils ne
s’évaporent et les ranger toujours hors de portée des enfants, dans un endroit
aéré.', '"ADEME
https://multimedia.ademe.fr/infographies/infographie_produits_menagers/index.html"', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, NULL, true, true, 'Air intérieur', NULL, NULL, NULL, false, NULL, true, false, 4647, true, false, NULL, NULL, NULL, NULL, NULL, false, '{}', '💡 Depuis 2013, tous les produits de construction et décoration (cloisons,
revêtements de sols, isolants, peintures, vernis, colles, adhésifs) sont munis
d''une étiquette qui indique leur niveau d’émission en polluants volatils, du
moins polluant A+ au plus polluant C.', NULL, true, NULL, false, 'Bricoler à l''extérieur lorsque c''est possible, de préférence le matin ou le
soir pour éviter les heures de fort ensoleillement.', 'https://www.atmo-bfc.org/tout-sur-l-air/agir-pour-l-air', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, true, false, false, '', NULL, false, false, false, true, false, false, 4748, false, false, NULL, NULL, NULL, true, false, false, '{}', '', NULL, false, NULL, false, '* Privilégier des sorties plus brèves et celles qui demandent le moins d''effort.
  * Les activités physiques et sportives intenses (dont les compétitions) à l''intérieur peuvent être maintenues.
  * En cas de gêne respiratoire ou cardiaque, prendre conseil auprès d''un professionnel de santé.', 'Arrêté du 13 mars 2018', 'deleted', false, 'episode_pollution', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, true, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4648, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les produits d''entretien et de bricolage courants contiennent des substances issues de la pétrochimie nocives pour la santé. Il est important de respecter les consignes de sécurité détaillées sur les modes d''emploi. [Plus
d’informations.](https://huit.re/infographie-ademe)', false, true, NULL, false, 'Lors de travaux de bricolage, porter des protections adaptées (masque,
lunettes, gants) lors de la manipulation de produits chimiques ou lors du
ponçage.', 'https://www.madininair.fr/A-la-maison', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', '{}', false, false, false, NULL, true, false, 4629, false, false, 0, 4, NULL, false, false, false, '{}', 'ℹ️ En périodes de pollinisation, les pollens sont particulièrement présents
dans l’air lorsque le temps est sec. Le vent favorise leur mise en suspension
dans l’air.', true, false, NULL, false, 'Éviter les promenades dans les champs ou en forêt lorsque le temps est sec.', 'ATMO Grand Est', 'published', false, 'pollens', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, true, 'Air intérieur', '{}', false, false, true, NULL, false, false, 4649, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les produits d''entretien et de bricolage courants contiennent des substances issues de la pétrochimie nocives pour la santé.  

💡Les mettre hors de portée des enfants, dans un local aéré, et équiper l''équiper d''un extincteur (les solvants contenus dans certains produits sont inflammables).', false, true, NULL, false, 'Stocker ses produits de bricolage dans un lieu adéquat, loin des espaces de vie (éviter le stockage dans la cuisine ou la salle de bain).', 'https://www.madininair.fr/A-la-maison', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4650, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les cuisinières à gaz produisent du dioxyde d''azote, un gaz irritant pouvant causer des problèmes respiratoires chez les personnes sensibles comme les asthmatiques. Pour nettoyer les brûleurs, utiliser un mélange de vinaigre blanc et d''eau chaude. 

💡Les brûleurs de la cuisinière à gaz sont propres lorsque l''on obtient un flamme bleue et courte dans chaque orifice.', false, true, NULL, false, 'Nettoyer régulièrement les brûleurs de votre cuisinière à gaz.', 'https://www.madininair.fr/A-la-maison', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, NULL, false, false, 'Air intérieur', NULL, NULL, NULL, false, NULL, NULL, false, 4654, false, false, NULL, NULL, NULL, NULL, NULL, false, '{}', 'Donner une information préalablement des périodes d''épandage', NULL, NULL, NULL, false, 'Si l''habitation est à proximité d''un champ agricole, éviter d''aérer durant les
périodes d''épandage.', '', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, true, false, false, false, 'Air intérieur', '{"chaudiere"}', false, false, false, NULL, true, false, 4655, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Une chaudière au fioul, gaz, bois, charbon ou multicombustible doit faire l''objet d''un entretien annuel obligatoire par le locataire.

💡Une chaudière entretenue régulièrement a une durée de vie plus longue, consomme moins de combustible, et produit donc moins de gaz à effet de serre et de polluants. De plus, un défaut d''entretien peut être à l''origine d''intoxication au monoxyde de carbone, un gaz inodore et invisible dangereux pour la santé.

Si vous êtes chauffé par une chaudière collective, l’entretien doit être effectué à l’initiative du propriétaire ou du syndicat des copropriétaires de l’immeuble.', false, true, NULL, false, 'Tous les ans, avant l’hiver, faire vérifier son système de chauffage par un·e
professionel·le qualifié·e.', 'https://www.ademe.fr/sites/default/files/assets/documents/fiche-entretien-des-chaudieres.pdf', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', '{}', false, false, false, NULL, false, false, 4633, false, false, 0, 4, NULL, false, false, false, '{}', 'ℹ️ En roulant fenêtres fermées, vous éviterez d''exposer votre visage aux pollens et limiterez leur accumulation dans l’habitacle du véhicule. Par ailleurs, pensez à vous assurer du bon état des filtres à pollens.', false, false, NULL, false, 'Eviter de rouler en voiture les fenêtres ouvertes ou d''utiliser la climatisation en période de pics polliniques.', 'ATMO : Nouvelle aquitaine
https://www.atmo-nouvelleaquitaine.org/article/les-pollens

https://pharmacie-des-arcades-luneville.com/allergies-10-conseils-a-suivre/', 'published', false, 'pollens', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Activité physique', NULL, false, false, true, NULL, false, false, 4672, false, false, NULL, NULL, NULL, false, false, false, '{}', 'Le problème majeur de qualité d’air intérieur provient de la réaction entre
les produits de chloration de l’eau et les substances d’origine organique
apportées par les nageurs (via la sueur, la salive, etc.). Cette réaction
donne naissance à des polluants présents à la fois dans l’eau et dans l’air :
le trichlorure d’azote (NCl3) et les trihalométhanes (THM). Leurs teneurs sont
très variables et augmentent, avec le nombre de baigneurs, la température de
l’eau et de l’air, le degré de chloration et la mauvaise ventilation du
bâtiment. Les effets sanitaires tels que les irritations oculaires cessent dès
que l’exposition s’arrête, mais les expositions répétées peuvent jouer un rôle
dans l’apparition ou l’aggravation de l’asthme infantile.', false, true, NULL, false, 'Les expositions répétées au trichlorure d’azote (NCl3) et aux trihalométhanes
(THM) présents à la fois dans l''eau et dans l''air des piscines couvertes
peuvent jouer un rôle dans l’apparition ou l’aggravation de l’asthme
infantile.', 'https://www.atmo-auvergnerhonealpes.fr/article/activites-physiques-et-qualite-de-lair-bien-respirer-pour-bien-bouger', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4625, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Les pollens se fixent sur les draps et les taies d''oreiller, ce qui peut
entraîner des réactions allergiques pendant la nuit.

💡 Les cheveux retiennent aussi les pollens : les brosser avant de se coucher.', false, false, NULL, false, 'Nettoyer fréquemment les draps, couettes, oreillers et aérer régulièrement la
literie.', 'OQAI 
https://www.oqai.fr/fr/pollutions/les-acariens', 'deleted', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Appareil de Combustion', NULL, false, false, false, NULL, false, false, 4678, false, false, NULL, NULL, NULL, false, false, false, '{}', 'ℹ️ La mauvaise utilisation et le défaut d''entretien des appareils de chauffage
et de production d''eau chaude augmentent le risque d''intoxication au monoxyde
de carbone.

💡[Plus d’information.](https://s.42l.fr/monoxyde)', false, true, NULL, false, E'Les règles d''usage des chauffe-eau et des petits appareils de cuisson non
raccordés à l''extérieur : \\- Les utiliser de façon intermittente \\- Pour une
courte durée (8 minutes maximum) \\- Dans une pièce suffisamment grande et
aérée (au moins 8 m3 pour un appareil de cuisson et 15 m3 pour un petit
chauffe-eau) \\- Ne pas les utiliser dans une salle-de-bains, une chambre à
coucher ou une salle de séjour et dans les studios.', 'OQAI, "les bons gestes pour un bon air".', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4682, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les barbecues au charbon de bois émettent un mélange de substances polluantes pour l’air et pouvant occasionner des effets sur notre santé. Privilégier l’usage de charbon de bois épuré (> 85% de carbone ou de catégorie A) et éviter les allume-feu chimiques à base de pétrole qui contiennent des composés organiques volatiles dangereux pour la santé.

💡 Pour en savoir plus sur la cuisson au barbecue : https://huit.re/barbecue-
air', false, true, NULL, false, 'Utiliser impérativement un groupe électrogène ou un barbecue dehors afin d''éviter les intoxications par le monoxyde de carbone.', 'https://www.atmo-auvergnerhonealpes.fr/actualite/barbecue-qualite-de-lair-et-sante', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4684, false, false, NULL, 0, NULL, false, false, false, '{}', '💡L’aération et la ventilation restent les moyens les plus efficaces
d''améliorer votre air intérieur.', false, true, NULL, false, 'Si une personne fume, augmenter l’aération de la pièce.', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4837, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, true, NULL, false, 'En cas d''utilisation d''un sèche-linge : pour réduire l''humidité dans la pièce, il est conseillé de vérifier que l’air de l’appareil est évacué vers l’extérieur et de vider le réservoir d’eau si l''appareil fonctionne avec un système à condensation.', '', NULL, false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4729, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Privilégier l’achat de produit ayant obtenus un label « Allergènes
Contrôlés » développé par l’Association de recherche clinique en allergologie
et asthmologie.

💡Une odeur agréable ne signifie pas que le produit est sain et/ou efficace.', false, true, NULL, false, 'Préférer l''achat de produits d''entretien non-parfumés pour réduire le risque
d''allergies.', 'Ademe', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4685, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les moisissures ont des effets négatifs sur la santé, elles exacerbent les
allergies respiratoires et l''asthme. [Plus
d’informations.](https://huit.re/anses-moisissures)', false, true, NULL, false, 'Après un dégât des eaux, assécher le plus rapidement possible et remplacer si
nécessaire les matériaux fortement endommagés (matelas, tapis, meubles
recouverts de tissus, placoplâtre, etc.).', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4688, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ L’air que l’on respire à l''intérieur est souvent moins bonne qualité que
l’air extérieur. Renouveler suffisamment l’air de son logement en ouvrant les
fenêtres quelques minutes par jour n''est parfois pas suffisant. Une
ventilation mécanique contrôlée permet un meilleur renouvellement de l''air à
condition de l''entretenir et de ne pas boucher les ouvertures. [Plus
d’informations.](https://huit.re/ventilation")"', false, true, NULL, false, 'Faire un entretien complet de votre VMC tous les 3 ans environ avec un
spécialiste (nettoyage, maintien des gaines, vérification des entrées d’air,
etc.)', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4690, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les matériaux et mobiliers neufs contiennent des Composés Organiques
Volatils (COV) qui s''évaporent dans votre logement et ont des effets négatifs
sur la santé (troubles respiratoires, irritation des yeux, réactions
allergiques...).

💡 Les COV sont contenus dans de nombreux produits et matériaux tels les
désodorisants, les laques, les vernis, les peintures, les colles, les
parquets, les solvants, les cires, les produits nettoyants, etc.', false, true, NULL, false, 'Aérer davantage chaque jour, pendant plusieurs semaines, les pièces dans une habitation qui vient d’être construite ou rénovée ou après installation de nouveaux mobiliers ou décoration.', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{"appoint"}', false, false, false, NULL, false, false, 4679, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Ces appareils sont conçus pour une utilisation brève uniquement (2h
maximum), dans une pièce bien aérée.

💡S''ils constituent l''unique source de chauffage de votre logement, ils peuvent
être à l''origine d''intoxication au monoxyde de carbone et favoriser
l’apparition de moisissures du fait du dégagement d’humidité.', false, true, false, false, 'Il est déconseillé d''utiliser un chauffage mobile d''appoint non électrique plus de 2 heures de suite en raison du risque d''intoxication par le monoxyde de carbone', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffer-mieux-moins-cher.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4681, false, false, 0, 0, NULL, false, false, false, '{}', '💡 Le monoxyde de carbone est un gaz inodore et invisible dangereux pour la santé. En France, un quart des intoxications au monoxyde de carbone sont dues à l''utilisation d''un appareil de combustion non racordé comme un brasero/barbecue, un groupe électrogène ou un chauffage mobile d’appoint.', false, true, false, false, 'Il est fortement déconseillé de se chauffer avec le four d’une cuisinière (porte ouverte), un radiateur de camping destiné à l’extérieur, un brasero ou un appareil radiant de chantier : ils peuvent provoquer des incendies ainsi que des intoxications au monoxyde de carbone.', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4693, false, false, NULL, 0, NULL, false, false, false, '{}', '💡 Il est important de bien respecter les usages des produits utilisés pour réduire les risques de pollution de l''air intérieur. Par exemple, ne pas utiliser à l''intérieur du logement des peintures réservées aux travaux d''extérieur.', false, true, NULL, false, 'Choisir les produits de construction et de décoration selon l’usage à en faire
(par exemple, pas de peinture réservée aux travaux d’extérieur à l’intérieur
des habitations).', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4694, false, false, NULL, NULL, NULL, false, false, false, '{}', '💡 Depuis 2013, tous les produits de construction et décoration (cloisons,
revêtements de sols, isolants, peintures, vernis, colles, adhésifs) sont munis
d''une étiquette qui indique leur niveau d’émission en polluants volatils, du
moins polluant A+ au plus polluant C.', false, true, NULL, false, 'Lors de l''achat de produits de construction, de décoration ou d’ameublement,
il est important de se renseigner auprès des fabricants sur les émissions
chimiques potentielles de ces produits.', 'OQAI, "les bons gestes pour un bon air".', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4697, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les produits ménagers courants contiennent des substances issues de la
pétrochimie nocives pour la santé.

💡 91% des produits testés dans une étude sur les produits ménagers émettent du
formaldéhyde, une substance cancérogène avérée pour l’homme, d’après le CIRC
(Centre international de recherche sur le cancer). [Plus
d’informations.](https://huit.re/infographie-ademe)', false, true, NULL, false, 'Dans son logement, stocker les produits chimiques loin des sources de chaleur,
dans un endroit ventilé.', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4699, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ La poussière est une accumulation de micro-particules contenant des
polluants, des acariens ou encore des pollens. Lorsqu’elle est inhalée, elle
peut entrainer des réactions respiratoires et allergiques.

💡Les aspirateurs équipés de filtres HEPA (Haute Efficacité pour les Particules
Aériennes) sont les plus efficaces pour retenir les poussières.', false, true, NULL, false, 'Nettoyer les sols de son logement avec un mélange à base d''eau plutôt qu''un
balayage simple pour éviter la remise en suspension des poussières.', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, true, NULL, false, false, 4703, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Attention : Ne jamais laisser un enfant seul dans une pièce avec une
fenêtre ouverte ou sur un balcon, il risquerait de chuter.

💡 Pour cela, il est conseillé de ne jamais placer de meubles ou objets sous
les fenêtres ou sur le balcon.', false, true, NULL, false, 'Ouvrir les fenêtres deux fois par jour pour renouveler l''air en veillant à la sécurité des enfants.', '"MTES
https://www.agir-pour-bebe.fr/fr/adopter-les-bons-gestes-pour-ameliorer-son-air-interieur"', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4702, false, false, NULL, 0, NULL, false, false, false, '{}', '💡Vous pouvez sinon les placer dans une vitrine.', false, true, NULL, false, 'Les petits objets ou bibelots sont des pièges à poussière, il est important de
les nettoyer régulièrement à l''aide d''un chiffon en microfibre.', 'OQAI, "les bons gestes pour un bon air".', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, true, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4706, true, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Si c''est impossible, ouvrir largement les fenêtres pendant le traitement et
quelques heures après.

💡Utiliser des produits naturels (comme un mélange vinaigre blanc, eau et sel)
ou des produits labélisés Ecolabel.', false, true, NULL, false, 'Il est préférable de sortir les plantes d''intérieur à l''extérieur pour les
traiter afin d''éviter que les pesticides ne se répandent dans l''air de le
logement.', 'Guide Inpes sur la QAI', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4587, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ "Un bon air chez moi" est un site développé par le Ministère de la
Transition Ecologique pour sensibiliser sur l''air intérieur. Vous pouvez
répondre en 5 minutes au premier quizz sur le thème "Aération, humidité et
chauffage".', false, true, NULL, false, 'Faire un diagnostic de la qualité de son air intérieur grâce à l''outil gratuit
["Un bon air chez moi"](https://unbonairchezmoi.developpement-
durable.gouv.fr/)', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, true, false, false, false, 'Air extérieur', '{"bois"}', false, false, false, NULL, false, true, 4714, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ La combustion du bois produit beaucoup de polluants, comme des particules
fines, qui contribuent à dégrader la qualité de l’air extérieur.

💡Avec l''allumage inversé, les gaz générés par la combustion sont étouffés dans
les flammes et finissent à leur tour en combustibles, au lieu de se
transformer en gaz polluants. [Retrouvez la méthode de l''allumage inversé en
page 7.](https://huit.re/allumage-feu)', false, true, false, false, 'Afin de réduire les émissions de particules fines lors de l''allumage d''un feu,
privilégier l''allumage inversé/par le haut.', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4710, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ 78% des Français de 18 à 64 ans ont un niveau d''activité physique ou
sportive inférieur aux recommandations de santé publique de 10 000 pas par
jour.

💡 En ville, en choisissant où l’on pratique son activité sportive, les
concentrations moyennes annuelles en polluants peuvent être de 20 à 40 %
(selon les polluants) plus faibles que lorsque l’on est proche des axes de
circulation.', false, true, false, false, 'Pratiquer une activité physique en extérieur aujourd''hui, en privilégiant les
parcs et les zones piétonnes.', 'https://www.atmo-auvergnerhonealpes.fr/article/activites-physiques-et-qualite-de-lair-bien-respirer-pour-bien-bouger', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4705, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Faire vérifier les systèmes de ventilation mécanique contrôlée (VMC) tous
les 3 ans par un.e spécialiste. [Plus
d’informations.](https://huit.re/ventilation)', false, true, false, false, 'Il est important de bien entretenir le système de ventilation de son logement
: ne pas boucher les entrées et sorties d’air, nettoyer et dépoussiérer les
grilles régulièrement.', 'Bureau EA2 du MSS', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', '{}', false, false, false, NULL, false, false, 4583, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ En ville, 40 % des trajets quotidiens effectués en voiture font moins de 3
km et sont 2 fois plus polluants qu’un trajet de plus grande distance
(surconsommation de carburant quand le moteur est froid, arrêts et
redémarrages fréquents...).

💡Pour calculer l''impact de vos déplacements sur le climat, essayez le
simulateur [Mon impact transport](https://monimpacttransport.fr/)', false, true, NULL, true, 'En ville, privilégier la mobilité active (vélo, marche) pour les déplacements.', '"MTES 
https://www.ecologie.gouv.fr/mobilites-et-transports-quelles-priorites
https://www.gouvernement.fr/risques/pollution-de-l-air"', 'deleted', true, 'indice_atmo', true, NULL, NULL, true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', NULL, false, false, true, NULL, false, false, 4668, false, false, NULL, NULL, NULL, false, false, false, '{}', E'ℹ️ Les enfants subissent davantage les conséquences de la pollution de l’air
car : \\- Leur organisme n’est pas mature il se trouve donc exposé et troublé
au cours de son développement. \\- Ils ont une fréquence respiratoire plus
élevée que celle des adultes, ce qui augmente les quantités d’air et donc de
polluants potentiellement inhalés. "', false, false, NULL, true, 'Avec ses enfants, ne pas modifier les déplacements indispensables mais éviter
les promenades et les activités à l’extérieur.', '"https://atmo-reunion.net/Que-faire-ou-ne-pas-faire-en-cas
Rapport UNICEF - Pour chaque enfant, un air pur
https://www.unicef.fr/sites/default/files/atoms/files/unicef_pollutionair_web.pdf"', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4724, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Le bois aggloméré dégage des composés organiques volatils (COV) dangereux
pour la santé. Les COV se propagent dans l’air et dans les poumons : ils
peuvent provoquer des troubles respiratoires, des irritations des yeux, du nez
et de la gorge, des réactions allergiques…

💡Lorsque c''est possible, préférer les meubles en bois massif plutôt qu''en bois
aggloméré.', false, true, NULL, false, 'En cas d''achat de mobilier en bois aggloméré, jeter rapidement le carton d’emballage et aérer souvent pendant plusieurs semaines.', 'Ademe', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4725, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Ces produits contiennent des acides forts extrêmement nocifs, qui causent
des brûlures de deuxième, voire de troisième degré.

💡 Utiliser du bicarbonate de soude, ou encore une ventouse ou un furet pour
retirer les bouchons.', false, true, NULL, false, 'Éviter d''utiliser des déboucheurs de canalisation chimiques. Ils contiennent
des substances toxiques pour la santé et l''environnement.', 'Ademe', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', '{}', false, false, false, NULL, false, false, 4739, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ D’après [l’ADEME](https://multimedia.ademe.fr/infographies/infographie-la-
mobilite-ademe/), en se fiant aux observations faites de l’impact du
télétravail pendant le confinement, la généralisation de la pratique
permettrait d''éviter 3,3 millions de déplacements par semaine soit 3 200
tonnes de CO2. Moins de CO2, c''est une meilleure qualité de l''air !', false, true, NULL, true, 'Privilégier le télétravail lorsque c''est possible pour réduire l''impact
environnemental de vos déplacements.', 'Ademe : https://multimedia.ademe.fr/infographies/infographie-la-mobilite-ademe/', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', '{}', false, false, false, NULL, false, false, 4741, false, false, NULL, 0, NULL, false, false, false, '{}', '💡 Un tramway émet 62 fois moins de CO2 qu''une voiture et un métro 54 fois
moins. Quant aux autobus, ils peuvent transporter en passagers l’équivalent de
40 à 50 voitures.', false, true, NULL, true, 'En ville, pour les trajets longs, privilégier les transports en commun.', 'Ademe : https://multimedia.ademe.fr/infographies/infographie-la-mobilite-ademe/', 'deleted', true, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', NULL, false, false, false, NULL, false, false, 4742, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les parcs de rechargement se développent de plus en plus : il existe plus
de 29 000 points de recharge ouverts au public en France en 2020.

💡 En France, le Plan Climat projette de stopper la vente de voitures à essence
et diesel d''ici 2040.', false, true, NULL, false, 'Lors de l''achat d''un nouveau véhicule, éviter les SUV (Véhicule Utilitaire
Sport) et privilégier les véhicules électriques.', 'Ademe : https://multimedia.ademe.fr/infographies/infographie-la-mobilite-ademe/', 'deleted', false, 'indice_atmo', false, NULL, NULL, true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4744, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Il est important de toujours aérer son logement, même en cas de qualité de
l''air mauvaise.

💡 En plus de l''air extérieur qui y pénètre s''ajoutent des polluants
spécifiques de l’air intérieur (polluants chimiques, fibres, particules...).
Une exposition répétée et durable, même à des doses parfois très faibles, peut
aggraver ou être à l’origine de pathologies chroniques ou de maladies graves.', false, false, NULL, true, 'Aérer au moins 10 minutes deux fois par jour en ouvrant les fenêtres pour
créer un courant d''air dans la pièce.', 'OQAI', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, true, false, false, 'Air extérieur', '{}', false, false, false, false, true, false, 4717, false, false, 0, 0, NULL, true, false, false, '{}', 'ℹ️ C''est durant les heures les plus chaudes de la journée que les
concentrations en ozone sont les plus élevées.

💡L''ozone est un polluant secondaire issu de réactions chimiques entre les
polluants primaires (émis par les voitures et l''industrie). Ces réactions sont
notamment accélérées par les rayons du soleil et les fortes chaleurs.', false, true, false, true, 'En été, préférer la pratique d''une activité physique ou sportive hors des heures les plus chaudes de la journée.', '', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4795, false, false, 0, 0, NULL, false, false, true, '{}', 'ℹ️ La pratique régulière d’une activité physique est bénéfique chez les
personnes sensibles à la qualité de l’air comme les personnes asthmatiques.
Elle améliore la tolérance à l’effort, aide à maintenir le contrôle de son
asthme et renforce le cœur.

💡 Pour favoriser le contrôle de la respiration et améliorer la capacité
respiratoire, privilégiez les activités suivantes :course à pied, natation,
arts martiaux, vélo, randonnée, danse, tennis, escalade.', false, true, false, false, 'Demander conseil à son médecin pour choisir le type d’activité sportive la
plus adaptée à sa condition physique.', '​​https://www.ameli.fr/paris/assure/sante/themes/asthme-vivre-maladie/asthme-activite-physique
', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4564, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les produits ménagers courants contiennent des substances issues de la
pétrochimie, nocives pour la santé. Ces substances peuvent provoquer des
allergies, des difficultés respiratoires, ou encore de l''asthme.

💡 Le rejet des substances chimiques après utilisation entraîne une pollution
de l’air et de l’eau. La plupart des produits d’entretien se retrouvent dans
les eaux usées domestiques (liquide vaisselle, lessive, déboucheur…). Ces eaux
sont acheminées vers les stations d’épuration, mais toutes les molécules
chimiques n''y sont pas éliminées avant leur rejet dans le milieu naturel. [En
savoir plus.](https://huit.re/infographie-ademe)', false, true, NULL, false, 'Il est possible de faire le ménage avec un appareil à vapeur, un linge humide ou une microfibre.', 'ATMO', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, NULL, false, false, 'Déplacements', NULL, NULL, NULL, false, NULL, NULL, false, 4645, false, false, NULL, NULL, NULL, NULL, NULL, false, '{}', 'ℹ️ L’étiquette environnementale est affichée sur tous les véhicules. L’échelle
de A à G, indique les émissions de CO2 du véhicule.

💡Les émissions de CO2 produites par un véhicule sont liées à l’efficacité
énergétique d’un véhicule, car moins on consomme de carburant, moins on émet
de CO2, et moins on contribue au changement climatique.', NULL, true, NULL, false, 'Il est préférable d''acheter un véhicule bien classé sur l’étiquette énergie :
il consommera moins de carburant et rejettera moins de polluants.', 'https://www.atmo-bfc.org/tout-sur-l-air/agir-pour-l-air', 'deleted', false, 'indice_atmo', false, NULL, NULL, true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', '{}', false, false, false, false, true, false, 4760, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ L''ambroisie est une plante très allergisante dont le pollen, émis en fin
d''été, provoque de fortes réactions (rhinites, conjonctivites, asthme,
urticaire...) chez les personnes sensibles.

💡En France, il existe un dispositif pour signaler les plantes d''ambroisie :
https://www.signalement-ambroisie.fr/. Votre signalement sera communiqué à la
mairie concernée qui engagera les actions nécessaires à l''élimination des
plants.', false, false, NULL, false, 'Pour lutter contre l’expansion de l’ambroisie, signaler les zones infestées par l’ambroisie sur https://www.signalement-ambroisie.fr/.', 'RNSA
https://www.pollens.fr/le-reseau/allergie

MSS
https://solidarites-sante.gouv.fr/sante-et-environnement/risques-microbiologiques-physiques-et-chimiques/especes-nuisibles-et-parasites/ambroisie-info/', 'hidden', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', '{}', false, false, false, false, false, false, 4752, false, false, 0, 1, NULL, false, false, false, '{}', 'ℹ️ Les pollens s''accrochent aux vêtement tout au long de la journée. Se changer permet d''éviter qu''ils se propagent dans votre logement.', false, false, NULL, false, 'Il est conseillé de se changer après une promenade pour éviter d''amener des pollens dans son logement.', 'ATMO : Nouvelle aquitaine
https://www.atmo-nouvelleaquitaine.org/article/les-pollens



https://www.comment-economiser.fr/allergie-pollen-que-faire.html', 'published', false, 'pollens', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', '{}', false, false, false, false, false, false, 4754, false, false, 0, 1, NULL, false, false, false, '{}', 'ℹ️ L’émission des pollens dans l’air débute dès le lever du soleil. Il est
conseillé d''aérer votre logement à partir de 19h.', false, false, NULL, false, 'Favoriser l’ouverture des fenêtres avant le lever et après le coucher du soleil, car l’émission des pollens dans l’air débute dès le lever du soleil.', 'MSS
Conseil de la santé publique (HCSP) 
avis publié le 28 avril 2016', 'published', false, 'pollens', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', '{}', false, false, false, false, false, false, 4766, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Les pollens sont un constituant connu de la poussière de maison.

💡 Les aspirateurs équipés de filtres HEPA (Haute Efficacité pour les
Particules Aériennes) sont les plus efficaces pour retenir les poussières.', false, false, NULL, false, 'Passer l''aspirateur régulièrement dans son logement.', 'ATMO : Nouvelle aquitaine
https://www.atmo-nouvelleaquitaine.org/article/les-pollens
Source : Afeda

', 'hidden', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Déplacements', '{}', false, false, false, false, false, false, 4749, false, false, NULL, 0, NULL, false, false, true, '{}', 'ℹ️ Il est conseillé de prendre son traitement avec soi pour prévenir ou
soulager une crise d''asthme d''effort. En cas d''oubli, éviter de pratiquer une
activité sportive.', false, true, NULL, false, 'En cas de sortie pour pratiquer une activité physique, ne pas oublier son
traitement d''urgence.', 'MSS', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', NULL, false, false, false, false, false, false, 4767, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Dans les zones polluées, la pollution de l''air rend plus sensible aux
allergies. De plus, même si la végétation est moins abondante, les plantes
pollinisent plus car elles sont soumises à un stress.

💡 Pour être informé de la qualité de l''air autour de chez vous, inscrivez-vous
à la lettre d''information Ecosanté.', false, false, NULL, true, 'Il est conseillé aux personnes allergiques de redoubler de vigilance lors des
épisodes de pollution.', 'RNSA : https://huit.re/vegetation', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, false, false, false, 4769, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Les filtres HEPA (Haute Efficacité pour les Particules Aériennes) sont les plus efficaces pour retenir les poussières. Plus la classe d’un filtre est élevée (de « H10 » à « H14 »), plus celui-ci est efficace.', false, true, NULL, false, 'Changer régulièrement les sacs d’aspirateur afin d''éliminer les acariens,
poils, pollens et autres allergènes.', 'ATMO BFC :https://www.atmo-bfc.org/qui-sommes-nous/actualites/filtre-hepa-pas-le-genre-a-remuer-la-poussiere', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, false, true, false, false, false, 'Chauffage', '{"bois"}', false, false, false, false, false, true, 4770, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les labels recommandés sont : NF Bois de Chauffage, France bois bûches,
Din+, EN plus...

💡Les combustibles bois porteurs de mentions PEFC et FSC proviennent de forêts
gérées durablement.', false, true, NULL, false, 'Pour le chauffage au bois, privilégier l''achat de bûches, plaquettes ou
granulés porteurs de labels ou de marques de qualité.', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, false, true, false, false, false, 'Chauffage', '{"bois"}', false, false, false, false, false, true, 4772, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Ces bois fournissent beaucoup d’énergie et procurent une plus grande
autonomie à votre appareil.

💡Les autres essences (feuillus tendres, résineux) sont plutôt réservées à
l’allumage.', false, true, NULL, false, 'Pour le chauffage au bois, privilégier les bûches de bois feuillu dense
(hêtre, charme, châtaignier, chêne, frêne, robinier).', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, false, true, false, false, false, 'Chauffage', '{"bois"}', false, false, false, false, false, true, 4774, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Un bon stockage permet au bois de bien sécher et aux granulés de garder
toute leurs qualités.

💡Prévoir 10 à 15 bûches à côté de votre foyer, 24 à 48 heures avant de les
utiliser pour parfaire le séchage.', false, true, NULL, false, 'Pour le chauffage au bois, entreposer le combustible de préférence légèrement
surélevé, dans un local sec et bien ventilé (garage, cave ventilée).', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', NULL, false, false, false, NULL, false, false, 4594, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Un.e salarié.e automobiliste qui habite à 30 km de son lieu de travail et
qui covoiture quotidiennement en alternance avec un.e voisin.e ou un.e
collègue économise près de 2 000 € chaque année. [Plus
d’informations](https://huit.re/covoiturage-fr)

💡Deux personnes dans une voiture, c’est deux fois moins de pollution !', false, true, NULL, true, 'Privilégier le covoiturage à l''usage individuel de la voiture.', 'ATMO : https://www.atmo-nouvelleaquitaine.org/article/les-bons-gestes-adopter-pour-reduire-la-pollution-lors-de-mes-deplacements', 'deleted', true, 'indice_atmo', false, NULL, NULL, true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', NULL, false, false, false, NULL, false, false, 4599, false, false, NULL, NULL, NULL, false, false, false, '{}', 'Difficile à localiser.', false, true, NULL, true, 'Lors du plein d''essence, privilégier les stations-service dont les pistolets
de pompe sont équipés pour empêcher la dispersion des vapeurs.', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison
 + airparif', 'deleted', false, 'indice_atmo', false, NULL, NULL, true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4588, false, false, NULL, NULL, NULL, false, false, true, '{}', 'ℹ️ Un.e CMEI enquête au domicile des personnes qui en font la demande – par le
biais d''un médecin, et sur prescription de celui-ci – réalise des prélèvements
(poussière, moisissures…) et des mesures d''allergènes, et établit un
diagnostic permettant ensuite de mettre en oeuvre des mesures pour l''éviction
des polluants domestiques, et d''adapter son habitat.

💡 [Plus d''information.](https://www.cmei-france.fr/)', false, true, NULL, false, 'Réaliser une enquête sur la qualité de l’air à son domicile, effectuée par
un.e conseiller.e médical.e en environnement intérieur (CMEI).', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, true, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4567, false, true, NULL, NULL, NULL, false, false, false, '{}', 'ℹ️ Les produits d''entretien et de bricolage courants libèrent des molécules
polluantes (pesticides, métaux, résidus des médicaments, cosmétiques...) dans
l’eau et l’environnement. Ces molécules, appelées micropolluants, peuvent être
toxiques pour la faune et la flore des milieux aquatiques.', false, true, NULL, false, 'Respecter les doses d’utilisation des produits d’entretien, d’hygiène et de
bricolage conseillées sur l’étiquette.', '"ADEME 
https://multimedia.ademe.fr/infographies/infographie_produits_menagers/index.html"', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4669, false, false, NULL, 1, NULL, false, false, false, '{}', '💡En cas d''allergie aux acariens, mettre une house anti-acariens autour du
matelas.', false, false, NULL, false, 'Retourner votre matelas 2 fois par an pour limiter la présence d''allergènes.', 'https://atmo-reunion.net/Que-faire-ou-ne-pas-faire-en-cas', 'deleted', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4575, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ L''air intérieur que nous respirons 80 % de notre temps (chez nous, au
travail, dans les transports en commun...) est 5 à 7 fois plus pollué que
l''air extérieur.', false, true, NULL, false, 'Fumer à l''intérieur de son logement est fortement déconseillé, même avec les
fenêtres ouvertes.', 'Guide de la pollution de l''air intérieur de l''Inpes', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, NULL, false, false, 'Activité physique', NULL, NULL, NULL, false, false, NULL, false, 4674, false, false, NULL, NULL, NULL, NULL, NULL, false, '{}', '💡Des idées de parcours à vélo dans toutes la France sur le
[site](https://veloenfrance.fr/) de la Fédération française de cyclotourisme.', NULL, true, NULL, false, 'Ce weekend, faire une balade à vélo.', '', 'deleted', false, 'indice_atmo', true, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Appareil de Combustion', '{"bois"}', false, false, false, NULL, false, false, 4680, false, false, NULL, NULL, NULL, false, false, false, '{}', '💡 Il est préférable d''installer dans ce cas une hotte à recyclage d’air et de
consulter un installateur.', false, true, NULL, false, 'Il est déconseillé d''installer une hotte raccordée à l’extérieur dans une
pièce où se trouve également un appareil raccordé à un conduit de fumée car
cela peut perturber gravement son fonctionnement.', 'OQAI, "les bons gestes pour un bon air".', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4683, false, false, NULL, NULL, NULL, false, false, false, '{}', 'ℹ️ Le tabagisme maternel pendant la grossesse augmente le risque de survenue :
• d''accidents gravidiques comme les hématomes rétroplacentaires et les
placentas bas insérés, • de retard de croissance intra-utérin, • de
prématurité, • de mort subite du nourrisson • une consommation globale de
soins plus importante dans la petite enfance.', false, true, NULL, false, 'Ne pas fumer à l’intérieur, surtout en présence d’enfants ou de femmes
enceintes.', 'OQAI, "les bons gestes pour un bon air".', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4827, false, false, NULL, 1, NULL, false, false, false, '{}', '', false, false, NULL, false, 'En cas d''allergie diagnostiquée, réduire les activités extérieures qui
entraînent une sur-exposition aux pollens (tonte du gazon, entretien du
jardin, activités sportives, etc.)', 'MSS', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, false, true, false, false, false, 'Air extérieur', '{"bois"}', false, false, false, false, false, true, 4776, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Le tirage est l’aspiration créée dans le conduit de cheminée. S''il est trop
fort, l’appareil surconsomme et gaspille de l’énergie, tout en émettant
davantage de particules fines.

💡Si vous constatez que les flammes sont aspirées dans le conduit, selon le
type d’appareil, réduisez la clé de tirage en vous référant à la notice ou
faites vérifier la vitesse de l’extracteur.', false, true, false, false, 'Si le bois brûle trop vite dans votre poêle ou cheminée, vérifier que le
tirage est bien réglé.', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Santé', '{}', false, false, false, false, false, false, 4610, false, false, NULL, 0, NULL, false, false, false, '{}', '💡 Un solvant a le pouvoir de dissoudre d''autres substances. La colle ou le
vernis sont par exemples des solvants.', false, false, NULL, true, 'Ne pas s''exposer à des facteurs irritants (fumée de tabac, utilisation de
solvants en espace intérieur, chauffage au bois, exposition aux pollens en
saison...).', 'Avis du HCSP  relatif aux messages sanitaires à diffuser
lors d’épisodes de pollution de l’air ambiant par les particules, l’ozone,
le dioxyde d’azote et/ou le dioxyde de soufre du 15 novembre 2013. + Avis du HCSP relatif à l’information et aux recommandations à diffuser en vue de prévenir
les risques sanitaires liés aux pollens allergisants 28 avril 2016', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, true, NULL, false, false, 4726, false, true, NULL, 0, NULL, false, false, false, '{}', E'ℹ️ L''eau de javel augmente significativement le risque d’infections
respiratoires chez l’enfant (sinusites, bronchites, otites, grippe,
pneumonie).

💡Les bonnes pratiques à respecter :

\\- Ne pas diluer l''eau de javel dans de l''eau chaude : une réaction chimique
pourrait provoquer la formation de dérivés de chlore très toxiques pour la
peau, les muqueuses, les bronches et les yeux.

\\- Ne pas mélanger l''eau de javel avec un acide comme le vinaigre blanc : le
mélange peut créer des gaz irritants et toxiques pour les voies respiratoires
et les yeux. L''urine étant un acide, éviter de verser de l''eau de javel dans
vos toilettes.

\\- Ne pas utiliser d''eau de javel si votre logement est équipé d''une fosse
septique : elle risque de tuer les bonnes bactéries qui font fonctionner la
fosse.', false, true, NULL, false, 'Ne pas utiliser trop d''eau de javel, très irritante pour les voies
respiratoires. Aérer longuement après utilisation.', 'Ademe', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4595, false, false, NULL, NULL, NULL, false, false, false, '{}', 'ℹ️ On retrouve plus de 900 substances chimiques dans notre air intérieur. Ces
substances émanent des vapeurs et fumées de cuisine, des produits d''entretien
et de bricolage, ou encore des moisissures liées à l''humidité du logement.', false, true, NULL, false, 'Penser à ouvrir ses fenêtres après avoir pris une douche, étendu du linge
humide pour le faire sécher, cuisiné, passé l’aspirateur, fait le ménage,
bricolé…', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison
 Guide de la pollution de l''air intérieur de l''Inpes', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, true, 4658, false, false, NULL, NULL, NULL, false, false, false, '{}', '💡 Pour savoir si son logement se trouve sur un sol qui émet des quantités
significatives de radon, une carte du potentiel radon de sa commune est
consultable [ici](https://huit.re/infographie-ademe").', false, true, NULL, false, 'En hiver, tester avec un détecteur s’il y a du radon dans mon habitation pour
protéger ses poumons.', 'Sources MSS/EA', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4651, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ La présence de moisissures dans les pièces humides peut être également le
signe d’une mauvaise ventilation.', false, true, NULL, false, 'Réparer les fuites, les infiltrations d’eau (toitures, tuyauterie, plomberie,
joints) le plus rapidement possible pour éviter les moisissures.', 'https://www.madininair.fr/A-la-maison', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, NULL, false, false, 'Equipement domestiques', NULL, NULL, NULL, false, NULL, NULL, false, 4738, false, true, NULL, NULL, NULL, NULL, NULL, false, '{}', 'ℹ️ Les habitations et les bureaux représentent 45 % de la consommation
d''énergie en France.', NULL, true, NULL, false, 'Pour économiser de l''énergie, laver son linge à froid ou à 40°C maximum et
utiliser le mode « éco » du lave-vaisselle.', 'Ademe', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Activité physique', NULL, false, false, false, false, NULL, false, 4670, false, false, NULL, NULL, NULL, false, false, false, '{}', 'Une "activité physique intense" est par exemples : courir, grimper une côte à
vive allure, faire du vélo à vive allure, faire de l''aérobic, nager à vive
l''allure, faire des sports et jeux de compétition (par ex. jeux traditionnels,
football, volleyball, hockey, basketball).', NULL, false, NULL, true, 'En cas de mauvaise qualité de l''air, il est recommandé à tous de réduire les
activités physiques d''intensité élevée.', 'https://www.atmo-auvergnerhonealpes.fr/article/activites-physiques-et-qualite-de-lair-bien-respirer-pour-bien-bouger', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4691, false, false, NULL, NULL, NULL, false, false, false, '{}', 'ℹ️ Le fait de garer sa voiture dans un garage intégré au lieu de résidence
peut augmenter notablement les concentrations de benzène dans les pièces
d’habitation.', false, true, NULL, false, 'Maintenir fermée la porte de communication entre le garage ou la cave et le
reste du logement afin d’éviter les émanations provenant de la chaudière, des
gaz d’échappement de la voiture ou de tout autre stockage de produits
(entretien, bricolage, jardinage).', 'OQAI, "les bons gestes pour un bon air".', 'deleted', false, 'indice_atmo', false, NULL, NULL, true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, true, true, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4646, true, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les produits utilisés pour le bricolage contiennent des substances toxiques
pour la santé (solvants, détergents, acides...). [En savoir
plus.](https://www.ademe.fr/sites/default/files/assets/documents/guide-
pratique-moins-produits-toxiques.pdf)', false, true, NULL, false, 'Effectuer ses travaux de bricolage quand le temps le permet, de manière à
pouvoir bien aérer son logement.', 'https://www.atmo-bfc.org/tout-sur-l-air/agir-pour-l-air', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, true, NULL, false, false, 4661, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Le transport routier génère des gaz et particules toxiques pour la santé.
Ces substances favorisent l''apparition et exacerbent l''asthme chez l''enfant.', false, true, false, true, 'Utiliser un porte-bébé ou un landau pour surélever son bébé par rapport à la route et le protéger des gaz d''échappement.', 'https://www.atmo-auvergnerhonealpes.fr/sites/ra/files/atoms/files/campagne_air_et_sante_-_messages_2017.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4663, false, false, 0, 0, NULL, false, false, false, '{}', '💡 Rouler dans les voies de bus et les pistes cyclables éloigne du trafic
routier et permet de diminuer son exposition à la pollution de l''air jusqu’à
-30% et de se protéger également des accidents de la route.', false, true, false, true, 'Préférer les pistes cyclables séparées de la voie principale de circulation.', 'https://www.atmo-auvergnerhonealpes.fr/article/activites-physiques-et-qualite-de-lair-bien-respirer-pour-bien-bouger
 

 Précision : Airparif', 'published', false, 'indice_atmo', true, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4733, true, false, 0, 0, NULL, false, false, false, '{}', E'💡Des exemples d''installations : \\- installer des nichoirs pour les hirondelles
et les mésanges, prédateurs de chenilles et de moustiques ; \\- créer des tas
de bois pour les crapauds et les hérissons qui s’attaquent aux limaces ; \\-
disposer des pots remplis de paille et retournés pour les perceoreilles
friands de pucerons.', false, true, false, false, 'Limiter l''usage d''insecticides en favorisant la présence de prédateurs
naturels dans son jardin.', 'Ademe', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4606, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Une voiture mal entretenue pollue plus. Réviser son véhicule régulièrement
permet de faire des économies et de limiter ses émissions de polluants.

💡 Penser donc à changer les filtres (huile, gasoil, air, etc.), à faire la
vidange et à vérifier régulièrement la pression des pneus.', false, true, false, false, 'Entretenir régulièrement son véhicule (en faisant une fois par an les
différents réglages nécessaires à son bon fonctionnement).', 'https://www.airparif.asso.fr/_pdf/les-petits-gestes-au-quotidien.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, NULL, false, false, 'Air intérieur', NULL, NULL, NULL, false, NULL, NULL, false, 4641, true, false, NULL, NULL, NULL, NULL, NULL, false, '{}', '', NULL, NULL, NULL, false, 'Fermer les portes et fenêtres pendant les tontes.', 'https://www.atmo-bfc.org/tout-sur-l-air/pollens', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, NULL, false, false, 'Déplacements', NULL, NULL, NULL, false, NULL, NULL, false, 4643, false, false, NULL, NULL, NULL, NULL, NULL, false, '{}', 'Préciser pourquoi.', NULL, NULL, NULL, false, 'Préférer les zones côtières pour vos vacances en juillet.', 'https://www.atmo-bfc.org/tout-sur-l-air/pollens', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4870, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'En cas d''accumulation d''algues sur la zone de baignade, se renseigner sur une potentielle interdiction de baignade : certaines algues sont toxiques.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, true, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4696, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ [Consulter](https://huit.re/pictogrammes-produits) la signification des
pictogrammes de danger présents sur les étiquettes.

💡Une étiquette « 100 % naturel » ou «à base de produits naturels» peut être
trompeuse.', false, true, NULL, false, 'Lors de l''utilisation de produits ménagers ou de bricolage, faire attention
aux pictogrammes de danger sur les étiquettes. Utiliser les produits dans des
endroits aérés.', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, NULL, false, false, 'Air intérieur', NULL, NULL, NULL, false, NULL, NULL, false, 4630, false, false, NULL, NULL, NULL, NULL, NULL, false, '{}', '', NULL, NULL, NULL, false, 'Fermer les fenêtres au moment où les pollens sont très présents dans l''air.', 'ATMO Grand Est', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4616, false, false, NULL, 0, NULL, false, false, false, '{}', '💡 Depuis 2013, tous les produits de construction et décoration (cloisons,
revêtements de sols, isolants, peintures, vernis, colles, adhésifs) sont munis
d''une étiquette qui indique leur niveau d’émission en polluants volatils, du
moins polluant A+ au plus polluant C.', false, true, NULL, false, 'Il est conseillé de décorer son logement avec des produits dont l’étiquette
“Emissions dans l’air intérieur” est au niveau A+.', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison
  https://www.cohesion-territoires.gouv.fr/etiquetage-des-produits-de-construction', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Déplacements', NULL, true, true, false, true, true, false, 4718, true, false, NULL, NULL, NULL, true, true, false, '{}', '', false, false, NULL, false, '⚠️ Privilégier les sorties plus brèves, et celles qui demandent le moins
d’effort.', '', 'deleted', true, 'episode_pollution', true, NULL, NULL, true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, true, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4635, false, false, NULL, NULL, NULL, false, false, false, '{}', 'ℹ️ Les produits utilisés pour le bricolage contiennent des substances toxiques
pour la santé.

💡 Ne pas oublier d''aérer pendant toute la durée des travaux et plusieurs
semaines après.', false, true, NULL, false, 'Lors de travaux de bricolage, sortir régulièrement de la pièce pour faire des
pauses.', '"ADEME
https://multimedia.ademe.fr/infographies/infographie_produits_menagers/index.html"', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4842, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Rester chez soi autant que possible  et se tenir informé 
- S’abriter dans un bâtiment en dur si besoin
- Utiliser son véhicule qu’en cas de force majeure. Sur la route, rouler au pas sans s’engager sur une route immergée. Si besoin, stationner en sécurité sans quitter son véhicule
- Utiliser son téléphone qu''en cas d''urgence', 'Météo France', 'published', false, 'vigilance_meteo', false, '{4}', '{3}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4628, false, true, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Même si le temps est idéal pour faire sécher le linge en extérieur, il est
conseillé de le faire sécher dans une pièce fermée.

💡Le pollen se dépose et se fixe sur les surfaces humides.', false, false, NULL, false, 'Éviter de faire sécher le linge à l''extérieur en période pollinique.', 'ATMO Grand Est

MSS
Conseil de la santé publique (HCSP) 
avis publié le 28 avril 2016

https://www.pollenundallergie.ch/infos-sur-pollens-et-allergies/conseils-prevention/?oid=1881&lang=fr', 'hidden', false, 'pollens', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, false, false, true, false, false, 'Air extérieur', '{}', false, false, false, false, false, false, 4721, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les niveaux de pollution varient tout au long de la journée. Pour le
dioxyde d’azote, ils sont plus importants pendant les heures de pointe du
matin et du soir. Évitez-les dans la mesure du possible.', false, false, false, true, 'Il est recommandé de pratiquer des activités physiques et sportives intenses (obligeant à respirer avec la bouche) le matin tôt, ou en soirée afin d’éviter les heures de pointe du trafic automobile.', 'ATMO Auvergne-Rhône-Alpes', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4592, true, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les substances présentes dans les engrais chimiques ont des effets néfastes
sur la santé et sur l''environnement.

💡Utiliser des engrais issus de votre propre consommation : par exemple, le
marc de café, les coquilles d''oeuf, la peau de banane, ou encore l''eau de
cuisson des pommes de terre.', false, true, false, false, 'Eviter d''utiliser des engrais chimiques.', 'https://www.atmo-nouvelleaquitaine.org/article/les-bons-gestes-adopter-dans-mon-jardin', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4652, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Toute charge superflue entraîne une surconsommation de carburant.

💡 Une galerie de toit consomme en moyenne 10 à 20 % en plus de carburant.', false, true, false, false, 'En voiture, il est conseillé de ne pas transporter de charges inutiles.', 'https://www.madininair.fr/Pratiquer-l-eco-conduite', 'hidden', false, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4686, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les moisissures se développent principalement dans les pièces humides mal
ventilées (salles de bains…) et sur les murs mal isolés. Leurs spores peuvent
envahir l’ensemble du logement. Elles ont des effets négatifs sur la santé,
elles exacerbent les allergies respiratoires et l''asthme. [Plus
d’informations.](https://huit.re/anses-moisissures)', false, true, NULL, false, 'Ouvrir les fenêtre après les activités qui produisent beaucoup d’humidité (bain, douche,
lessive, cuisson, etc.) pour éviter la condensation de l’eau sur les surfaces (murs, meubles, etc.).', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', '{}', false, false, false, NULL, false, false, 4712, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les niveaux de pollution varient tout au long de la journée. Pour le
dioxyde d’azote, ils sont plus importants pendant les heures de pointe du
matin et du soir. Évitez-les dans la mesure du possible.

💡Néanmoins, il vaut mieux faire du vélo dans des conditions polluées que de
rester sédentaire ! Pour en savoir plus, consultez [l''étude de
l''ADEME](https://bit.ly/3hgnsIi)

.', false, true, NULL, true, 'À vélo, rouler de préférence pendant les heures creuses.', 'https://www.ademe.fr/sites/default/files/assets/documents/cyclopol_201511.pdf', 'deleted', false, 'indice_atmo', true, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, true, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4687, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ L’humidité excessive dans les logements provoque l’apparition de moisissures qui présentent un risque allergène et toxique. Elles apparaissent sur les murs, sols ou plafonds sous forme de tâches vertes ou noirâtres.

💡Pour se sentir bien, le taux d’humidité doit être compris entre 35 et 60 %.', false, true, NULL, false, 'Faire sécher le linge le plus souvent possible à l’extérieur ou dans une pièce bien aérée, en laissant les fenêtres ouvertes.', 'https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison%20%20Guide%20de%20la%20pollution%20de%20l''air%20int%C3%A9rieur%20de%20l''Inpes', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, true, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4623, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ La salive, la peau, les glandes anales des animaux domestiques (chat,
chien, etc.) sont des réservoirs d''allergènes.

💡 Ne pas oublier d''aérer son logement.', false, false, NULL, false, 'Il est conseillé d''interdire certaines pièces aux animaux domestiques
(notamment la chambre).', 'https://www.airparif.asso.fr/pollution/air-interieur-generalites 
  Guide Inpes sur la QAI', 'hidden', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4866, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Se baigner sur des sites de baignade déclarés aux autorités locales et sanitaires (présence d’un affichage sur site) et ne faisant pas l’objet d’une interdiction de baignade.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{"bois"}', false, false, false, NULL, false, true, 4615, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Ces types de bois pourraient dégager des substances toxiques ou corrosives en brûlant et encrasser le conduit de votre appareil.

💡 Les pigments contenus dans les bois peints contiennent des métaux toxiques.', false, true, NULL, false, 'Dans un feu de cheminée : ne pas utiliser du bois de récupération, souillé,
peint ou vernis.', 'Guide ADEME "Chauffage au bois - mode d''emploi" https://www.ademe.fr/chauffage-bois-mode-demploi', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4565, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ La plupart des produits d’entretien se retrouvent dans les eaux usées domestiques (liquide vaisselle, lessive, déboucheur…). Ces eaux sont acheminées vers les stations d’épuration, mais toutes les molécules chimiques n''y sont pas éliminées avant leur rejet dans le milieu naturel. Cela entraîne une pollution de l''air et de l''eau. 

💡 Pour savoir quel label privilégier, consulter les labels recommandés par l''Agence de l''écologie (ADEME) : https://agirpourlatransition.ademe.fr/particuliers/labels-environnementaux#labelsrow-3', false, true, NULL, false, 'Limiter le nombre de produits ménagers et privilégiez les produits écolabellisés.', '"ADEME
https://www.ademe.fr/sites/default/files/assets/documents/achats-responsables-et-ecolabel-europeen_010324.pdf"', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4826, false, false, NULL, 1, NULL, false, false, false, '{}', '', false, false, NULL, false, 'En cas d''allergie diagnostiquée, penser à prendre le traitement prescrit par
votre médecin.', 'MSS', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4844, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Rester chez soi autant que possible 
- Respecter les consignes de sécurité en vigueur dans les stations de montagne
- Se tenir informé auprès des autorités', 'Météo France', 'published', false, 'vigilance_meteo', false, '{4}', '{8}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4561, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Ouvrir les fenêtres au moins 10 minutes, de préférence tôt le matin et tard
le soir, en dehors des heures de pointe. Les heures de pointe où les taux de
pollution sont les plus élevés sont généralement entre 7h-10h et entre
17h-20h.', false, false, NULL, true, 'Même lorsque la qualité de l''air est mauvaise, il est nécessaire d''aérer son
logement pour faire circuler l''air.', 'Infographies MSS : 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_generale.pdf 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_enfants.pdf
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_age.pdf', 'deleted', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4634, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les matériaux et mobiliers neufs contiennent des Composés Organiques
Volatils qui s''évaporent dans votre logement et ont des effets négatifs sur la
santé (troubles respiratoires, irritation des yeux, réactions allergiques...).

💡 Les COV sont contenus dans de nombreux produits et matériaux tels que les
désodorisants, les laques, les vernis, les peintures, les colles, les
parquets, les solvants, les cires, les produits nettoyants, etc.', false, true, false, false, 'Eviter les lieux qui ont fait l''objet de travaux récents, les matériaux et mobiliers neufs contiennent des Composés Organiques Volatils qui ont des effets négatifs sur la santé.', 'https://www.airparif.asso.fr/pollution/air-interieur-generalites
 Guide INPES sur la QAI', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, true, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4613, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Choisir de préférence des produits avec la norme NF130, qui garantit que la fabrication de ces produits et leur utilisation a un impact limité sur l''environnement ainsi qu''une teneur réduite en solvants et une absence de certaines substances dangereuses. Enfin, les solvants usagés, les restes de peinture ou les colles doivent être apportés en déchèterie. 

💡 Les solvants usagés, les restes de peinture ou les colles doivent être
apportés en déchèterie.', false, true, NULL, false, 'Lors du bricolage, limiter l''usage de produits (peintures, colles, solvants, vernis, cires, décapants, diluants...) qui peuvent dégager des éléments toxiques dans l''air intérieur et privilégier des techniques alternatives comme le ponçage ou le décapage par la chaleur.', 'https://www.airparif.asso.fr/_pdf/les-petits-gestes-au-quotidien.pdf', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4832, false, false, NULL, 0, NULL, false, false, false, '{3}', '', false, false, NULL, false, 'Pour réduire les niveaux de radon et garantir une bonne qualité de l’air dans votre logement, aérer régulièrement les pièces et s’assurer du bon fonctionnement du système de ventilation.', 'IRSN', 'published', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4597, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Pour nettoyer la VMC, déclipser la partie amovible et lavable et la
repositionner après nettoyage. Attention : ne pas mouiller les parties fixes
des entrées d’air hygroréglables, cela risque de nuire à leur bon
fonctionnement.

💡 [Plus d’informations sur la ventilation de son
logement](https://huit.re/ventilation)', false, true, NULL, false, 'Ne jamais éteindre la ventilation mécanique contrôlée (VMC) de son logement et
la nettoyer régulièrement.', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Activité extérieure', '{}', false, false, false, NULL, false, false, 4631, true, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Ces équipements de protection permettront de diminuer l''exposition aux pollens. Les lunettes vont protéger la muqueuse oculaire et limiter les conjonctivites dues aux pollens. Les masques limiteront l''inhalation des pollens.', false, false, NULL, false, 'En période de pollinisation, se promener ou jardiner de préférence avec des lunettes et un masque de protection.', 'ATMO Grand Est', 'hidden', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4657, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ La poussière peut entraîner des allergies ou de l''asthme chez les personnes
sensibles.', false, true, NULL, false, 'Nettoyer les sols plusieurs fois par semaine avec un linge humide ou un aspirateur à filtre HEPA pour éviter de remettre en suspension les poussières.', 'Sources MSS/EA', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4709, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ La poussière peut entraîner des allergies ou de l''asthme chez les personnes
sensibles.', false, true, NULL, false, 'Lors de travaux, privilégier un nettoyage avec un linge humide ou un aspirateur à filtre HEPA pour éviter la remise en suspension des poussières.', 'Guide Inpes sur la QAI', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, 'Activité sportive', '{}', false, false, false, NULL, false, false, 4784, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Privilégier des séances qui n’augmenteront pas trop la fréquence
respiratoire pour limiter l''inhalation de polluants. Eviter, par exemple, les
séances de fractionné et privilégier plutôt le renforcement musculaire.

💡Lorsque l''on respire par la bouche, l’air aspiré échappe au filtre naturel
des voies nasales.', false, false, NULL, true, 'En cas de mauvaise qualité de l''air, éviter les séances de sport trop longues.', 'https://www.atmo-bfc.org/qui-sommes-nous/actualites/comment-concilier-running-et-qualite-de-l-air', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, true, NULL, false, 'Activité physique', '{}', false, false, false, NULL, false, false, 4785, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les concentrations de polluants sont plus élevées dans les zones où l''air
circule mal.

💡 Eviter les fonds de vallées en montagne et les rues canyons dans les centre-
villes.', false, true, NULL, false, 'Pour faire du sport, privilégier les zones les plus en hauteur lorsque c''est
possible.', 'https://www.atmo-bfc.org/qui-sommes-nous/actualites/comment-concilier-running-et-qualite-de-l-air', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4786, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Irriguer les yeux après la pratique sportive avec du sérum physiologique
réduira aussi les démangeaisons.', false, true, NULL, false, 'En cas de démangeaisons des yeux lors des activités physiques, porter des
lunettes avec protection latérale permettra de protéger les yeux du pollen.', 'Allergologue', 'published', false, 'pollens', true, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4822, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, true, 'Privilégier les transports en commun plutôt que la voiture afin de limiter les
émissions de polluants dans l''air.', 'ATMO', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4830, false, false, NULL, 0, NULL, false, false, false, '{1,2}', '', false, false, NULL, false, 'Pour améliorer la qualité de l’air dans votre logement, aérer 10 minutes matin et soir.', 'IRSN', 'published', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4622, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les textiles neufs contiennent des produits chimiques présents dans les
teintures.', false, true, false, false, 'Il est conseillé de laver les textiles (linge de maison, vêtements, etc.) avant utilisation.', 'https://www.airparif.asso.fr/pollution/air-interieur-generalites', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', true, true, false, NULL, false, false, 4792, false, false, 0, 0, NULL, false, true, false, '{}', '', false, false, false, false, '- En cas de gêne respiratoire ou cardiaque, prendre conseil auprès d’un professionnel de santé.
- Privilégier des sorties plus brèves et celles qui demandent le moins d’effort ;

Si vous êtes une personne sensible ou vulnérable :

  * prendre conseil auprès de votre médecin pour savoir si votre traitement médical doit être adapté le cas échéant ; 
  * éviter les zones à fort trafic routier, aux périodes de pointe ;
  * privilégier les activités modérées.', '', 'published', false, 'episode_pollution', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4794, false, false, NULL, 0, NULL, false, false, true, '{}', 'ℹ️ Lors de la pratique d’une activité physique, il arrive que les bronches se
contractent, ce qui peut entraîner des symptômes variables d’une personne à
l’autre : toux, essoufflement ou gêne respiratoire, sensation d’oppression sur
la poitrine. On parle alors d’asthme d’effort qui peut survenir pendant ou
après l’effort physique.

💡L’asthme d’effort ne se manifeste pas chez toutes les personnes asthmatiques,
ni à chaque effort.', false, false, NULL, true, 'En cas de gêne respiratoire lors des activités physiques, consulter son
médecin généraliste.', 'https://www.ameli.fr/paris/assure/sante/themes/asthme-vivre-maladie/asthme-activite-physique
', NULL, false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4798, false, false, NULL, 0, NULL, false, false, true, '{}', 'ℹ️ Il est important de laisser le temps aux bronches de se réadapter à un
rythme normal.

💡 Adapter l’intensité de son activité à sa forme du jour. Une fatigue
passagère ou un rhume peuvent affecter la fonction respiratoire. Ne pas
hésiter à se reposer et à ajuster l’intensité de l’activité physique.', false, true, NULL, false, 'À la fin d''une activité physique, diminuer progressivement l’effort, sans
s’arrêter brutalement.', '​​https://www.ameli.fr/paris/assure/sante/themes/asthme-vivre-maladie/asthme-activite-physique', NULL, false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', '{}', false, false, false, false, false, false, 4757, false, false, NULL, 4, NULL, false, false, false, '{}', 'ℹ️ Les symptômes en cas d''allergie aux pollens sont :

  * crises d’éternuement ;
  * nez qui gratte, parfois bouché ou qui coule clair ;
  * yeux rouges, qui démangent ou qui larmoient ;
  * en association éventuelle avec une respiration sifflante ou une toux.

💡L’allergie peut bénéficier de mesures de prévention et de soins. Pour cela
demandez conseil à votre pharmacien ou consultez votre médecin.', false, false, NULL, true, 'En cas de gêne répétitive et saisonnière liée aux symptômes ci-dessous, et
dans un contexte de fatigue inhabituelle, vous souffrez peut être d’une
allergie aux pollens.', 'MSS
Conseil de la santé publique (HCSP) 
avis publié le 28 avril 2016', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4802, false, false, NULL, 0, 1, false, false, false, '{1}', 'ℹ️ Le radon est un gaz radioactif naturel présent dans le sol et les roches.
Il est classé cancérigène certain pour le poumon par le Centre international
de recherche sur le cancer depuis 1987. Le potentiel radon fournit un niveau
de risque relatif à l''échelle d''une commune. Pour le consulter, l’Institut de
radioprotection et de sûreté nucléaire met à disposition une
[cartographie](https://tinyurl.com/carto-radon) qui classe les communes en
trois zones allant du potentiel faible au potentiel significatif. En savoir
plus [ici](https://tinyurl.com/mss-radon). 💡 Le potentiel radon d’une commune
ne présage en rien des concentrations présentes dans votre habitation :
celles-ci dépendent de multiples autres facteurs (étanchéité de l''interface
entre le bâtiment et le sol, taux de renouvellement de l''air intérieur, etc.).', false, false, NULL, false, '📍 Le niveau de risque radon de votre commune est faible.

Pour réduire les niveaux de radon et garantir une bonne qualité de l’air dans
votre logement, aérer les pièces du logement au moins 10 minutes par jour, en
toute saison.', 'IRSN et MSS
https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4831, false, false, NULL, 0, NULL, false, false, false, '{1,2,3}', '', false, false, NULL, false, 'Le potentiel radon donne un niveau de risque relatif de présence du radon, un
gaz naturel radioactif, à l''échelle d''une commune. Il ne présage pas de sa
concentration dans le logement. Pour connaître les niveau de radon dans son
logement, il est possible de les mesurer en se procurant un [kit de
mesurage](https://tinyurl.com/carto-radon).', 'IRSN', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4833, false, false, NULL, 1, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Favoriser l’ouverture des fenêtres avant le lever et après le coucher du
soleil pour éviter que les pollens ne pénètrent dans le logement.', 'RNSA
', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4797, false, false, 0, 0, NULL, false, false, true, '{}', 'ℹ️ L’échauffement permet de préparer ses bronches à l’activité physique en
accélérant petit à petit le rythme respiratoire.

💡 Toujours avoir avec soi son bronchodilatateur d’action rapide.', false, true, false, false, 'Il est important de s''échauffer progressivement avant la pratique sportive
afin de réduire le risque de crise d’asthme.', '​​https://www.ameli.fr/paris/assure/sante/themes/asthme-vivre-maladie/asthme-activite-physique', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4800, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Lors de la pratique d’une activité physique, il arrive que les bronches se
contractent, ce qui peut entraîner des symptômes variables d’une personne à
l’autre : toux, essoufflement ou gêne respiratoire, sensation d’oppression sur
la poitrine. On parle alors d’asthme d’effort qui peut survenir pendant ou
après l’effort physique.

💡L’asthme d’effort ne se manifeste pas chez toutes les personnes asthmatiques,
ni à chaque effort.', false, true, false, false, 'En cas de gêne respiratoire lors des activités physiques, consulter son
médecin généraliste.', '​​https://www.ameli.fr/paris/assure/sante/themes/asthme-vivre-maladie/asthme-activite-physique
', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4871, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Ne pas se baigner après des orages violents susceptibles d''avoir conduit à des rejets non maîtrisés dans l''eau.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, true, false, 4734, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les barbecues au charbon de bois émettent un mélange de substances
polluantes pour l’air et pouvant occasionner des effets sur la santé.

💡Leur utilisation doit se faire impérativement dans un lieu bien aéré et
ventilé.', true, true, false, false, 'Lors de l''utilisation d''un barbecue, rester éloigné pour ne pas inhaler des
particules de combustion.', 'Airducation et ATMO', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4804, false, false, NULL, 0, 3, false, false, false, '{1}', 'ℹ️ La mesure s’effectue sur une durée de deux mois, en période de chauffe du
logement, c’est-à-dire entre mi-septembre et fin avril. Il est conseillé de se
munir de trois détecteurs par logement. La liste des sociétés vendant des kits
de mesurage est disponible sur le [site de l’Institut de radioprotection et de
sûreté nucléaire (IRSN)](https://tinyurl.com/carto-radon) et de [l’Autorité de
sûreté nucléaire (ASN).](https://tinyurl.com/asn-radon)

💡 En France, le radon est la seconde cause de cancer du poumon, derrière le
tabagisme. Par ailleurs, de nombreuses études scientifiques ont montré que la
combinaison d’une exposition au tabac et d’une exposition élevée au radon fait
courir un risque individuel de cancer du poumon plus élevé que chacun des
facteurs pris individuellement.', false, false, NULL, false, '📍 Le niveau de risque radon de votre commune est faible.

Pour connaître la concentration en radon dans votre logement, il est possible
de la mesurer en se procurant un kit de mesurage.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo
', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4787, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Les grains de pollens sont très petits : entre 7 et 150 micromètres (μm)
selon l''espèce. On ne peut les observer qu''au microscope. Ainsi, lors des
activités en extérieur, ils s''accrochent aux tissus et s''introduisent ensuite
dans le logement.', false, false, NULL, false, 'En rentrant d’une activité physique en extérieur, il est recommandé de secouer
ou laver directement les vêtements portés.', 'RNSA', 'published', false, 'pollens', true, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4788, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Durant les périodes polliniques, les grains de pollens sont très nombreux
dans l’air et s’accrochent à vos cheveux.

💡 Porter une casquette réduit le risque de pénétration des grains de pollens
dans vos yeux et vos cheveux.', false, true, NULL, false, 'Rincer ses cheveux après une activité physique en extérieur afin d’éliminer
les pollens.', 'RNSA et allergologue', 'published', false, 'pollens', true, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Activité physique', NULL, true, true, false, true, NULL, false, 4585, false, false, NULL, NULL, NULL, false, true, false, '{}', 'ℹ️ Une activité physique sportive et intense est une activité qui oblige à
respirer par la bouche.

💡 Par exemples : courir, grimper une côte à vive allure, faire du vélo à vive
allure, faire de l''aérobic, nager à vive l''allure, faire des sports et jeux de
compétition (par ex. jeux traditionnels, football, volleyball, hockey,
basketball)...', NULL, false, NULL, false, '⚠️ Réduire, voire reporter, les activités physiques et sportives intenses
(dont les compétitions).', 'Arrêté du 13 mars 2018 modifiant l’arrêté du 20 août 2014 relatif aux recommandations sanitaires en vue de prévenir les effets de la pollution de l’air sur la santé, pris en application de l’article R. 221-4 du code de l’environnement', 'deleted', false, 'episode_pollution', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Déplacements', NULL, false, false, true, true, true, false, 4602, true, false, NULL, 0, NULL, true, false, true, '{}', 'ℹ️ L''ozone est un polluant secondaire issu de réactions chimiques entre les
polluants primaires (émis par les voitures et l''industrie). Ces réactions sont
notamment accélérées par les rayons du soleil et les fortes chaleurs.', false, false, NULL, false, '⚠️ Eviter les sorties durant l’après-midi lorsque l’ensoleillement est
maximum.', 'Arrêté du 13 mars 2018 modifiant l’arrêté du 20 août 2014 relatif aux recommandations sanitaires en vue de prévenir les effets de la pollution de l’air sur la santé, pris en application de l’article R. 221-4 du code de l’environnement', 'deleted', true, 'episode_pollution', true, NULL, NULL, true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Activité physique', NULL, false, false, false, true, NULL, false, 4574, false, false, NULL, NULL, NULL, true, false, false, '{}', 'ℹ️ Une activité physique sportive et intense est une activité qui oblige à
respirer par la bouche.

💡 Par exemples : courir, grimper une côte à vive allure, faire du vélo à vive
allure, faire de l''aérobic, nager à vive l''allure, faire des sports et jeux de
compétition (par ex. jeux traditionnels, football, volleyball, hockey,
basketball)...', NULL, false, NULL, false, '⚠️ Les activités physiques et sportives intenses (dont les compétitions) à
l’intérieur peuvent être maintenues.', 'Arrêté du 13 mars 2018 modifiant l’arrêté du 20 août 2014 relatif aux recommandations sanitaires en vue de prévenir les effets de la pollution de l’air sur la santé, pris en application de l’article R. 221-4 du code de l’environnement', 'deleted', false, 'episode_pollution', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', NULL, false, false, false, false, false, false, 4763, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Les substrats sur lesquels poussent les végétaux sont favorables au
développement de moisissures qui peuvent être à l’origine de réactions
allergiques.

💡 Des exemples de plantes et fleurs d''intérieur allergisantes : ficus, cactus
de noël, poinsettia, géranium, lys, tulipe...', false, false, NULL, false, 'Ne pas disposer de plantes et bouquets de fleurs dans les chambres à coucher.', 'ATMO : Burgogne-Franche-Comté 
https://www.atmo-bfc.org/qui-sommes-nous/actualites/aux-petits-soins-avec-ses-plantes-et-son-air#:~:text=Parmi%20ces%20plantes%20d ', 'deleted', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4812, false, false, NULL, 0, 2, false, false, false, '{2}', 'ℹ️ Les effets du radon sur la santé sont liés à sa concentration dans l''air.
Si le radon se dilue très rapidement à l’extérieur, il peut s’accumuler et
atteindre des niveaux élevés dans les espaces clos tels que les bâtiments. Ces
niveaux dépendent des caractéristiques du sol et du bâtiment (type de
soubassement, ventilation, chauffage).

💡 Les travaux énergétiques peuvent conduire à un confinement des locaux. Il
est nécessaire de veiller à maintenir un bon système de ventilation.', false, false, NULL, false, '📍Le niveau de risque radon dans votre commune est moyen.

Pour réduire les niveaux de radon dans votre logement, s''assurer que les
entrées d’air ne sont pas obstruées et entretenir le système de ventilation.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4801, false, false, 0, 0, NULL, false, false, true, '{}', 'ℹ️ Il est important de laisser le temps aux bronches de se réadapter à un
rythme normal.

💡 Adapter l’intensité de son activité à sa forme du jour. Une fatigue
passagère ou un rhume peuvent affecter la fonction respiratoire. Ne pas
hésiter à se reposer et à ajuster l’intensité de l’activité physique.', false, true, false, false, 'À la fin d’une activité physique, diminuer progressivement l’effort, sans
s’arrêter brutalement.', '​​https://www.ameli.fr/paris/assure/sante/themes/asthme-vivre-maladie/asthme-activite-physique', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4878, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Laver régulièrement les serviettes et vêtements de bain.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4809, false, false, NULL, 0, 6, false, false, false, '{3}', 'ℹ️ Ces travaux visent à abaisser les concentrations en radon en :

  * assurant l''étanchéité du bâtiment vis-à-vis des [voies d’entrées du radon](https://tinyurl.com/voies-radon) ;
  * augmentant le renouvellement d''air à l''intérieur des pièces habitées pour diluer le radon ;
  * traitant le soubassement (vide sanitaire, cave, dallage sur terre-plein) par une ventilation ou la mise en place d''une légère dépression d''air par rapport au volume habité par extraction mécanique.

💡 Les effets du radon sur la santé sont liés à sa concentration dans l''air. Si
le radon se dilue très rapidement à l’extérieur, il peut s’accumuler et
atteindre des concentrations élevées dans les espaces clos. Ces concentrations
dépendent des caractéristiques du sol et du logement (aération, matériaux de
construction, chauffage).', false, false, NULL, false, '📍 Le niveau de risque radon de votre commune est élevé.

Si la concentration en radon dans votre habitation dépasse 1 000 Bq/m3 ou si
la concentration persiste au-dessus de 300 Bq/m3 après la mise en œuvre de
bonnes pratiques d’aération et d’aménagements : faire réaliser un diagnostic
du bâtiment par un professionnel pour définir les travaux à réaliser.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo
', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Santé', NULL, true, true, true, true, NULL, false, 4586, false, false, NULL, NULL, NULL, true, true, true, '{}', '', NULL, false, NULL, false, '⚠️ Prendre conseil auprès de votre médecin pour savoir si votre traitement
médical doit être adapté le cas échéant.', 'MSS', 'deleted', false, 'episode_pollution', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4708, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ La poussière entraine des allergies et/ou de l''asthme chez les personnes
sensibles. Passer l’aspirateur deux fois par semaine dans votre logement pour
les limiter.', false, true, NULL, false, 'Chez soi, éviter l’abondance de tapis, de moquettes et de tentures qui
favorisent l’accumulation de poussières.', 'Guide Inpes sur la QAI', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', NULL, false, false, false, false, false, false, 4762, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Les végétaux présents dans les logements ou les bureaux peuvent présenter
une certaine toxicité et être à l’origine de troubles allergiques.

💡 Des exemples de plantes et fleurs d''intérieur allergisantes : ficus, cactus
de noël, poinsettia, géranium, lys, tulipe...', false, false, NULL, false, 'Eviter de disposer dans son logement des bouquets et plantes allergisantes.', 'ATMO : Nouvelle aquitaine
https://www.atmo-nouvelleaquitaine.org/article/les-pollens

ATMO : Burgogne-Franche-Comté 
https://www.atmo-bfc.org/qui-sommes-nous/actualites/aux-petits-soins-avec-ses-plantes-et-son-air#:~:text=Parmi%20ces%20plantes%20d ', 'deleted', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4810, false, false, NULL, 0, 1, false, false, false, '{2}', 'ℹ️ Le radon est un gaz radioactif naturel présent dans le sol et les roches.
Il est classé cancérigène certain pour le poumon par le Centre international
de recherche sur le cancer depuis 1987. Le potentiel radon fournit un niveau
de risque relatif à l''échelle d''une commune. Pour le consulter, l’Institut de
radioprotection et de sûreté nucléaire met à disposition une
[cartographie](https://tinyurl.com/carto-radon) qui classe les communes en
trois zones allant du potentiel faible au potentiel significatif. En savoir
plus [ici](https://tinyurl.com/mss-radon). 💡 Le potentiel radon d’une commune
ne présage en rien des concentrations présentes dans votre habitation :
celles-ci dépendent de multiples autres facteurs (étanchéité de l''interface
entre le bâtiment et le sol, taux de renouvellement de l''air intérieur, etc.).', false, false, NULL, false, '📍 Le niveau de risque radon de votre commune est moyen.

Pour réduire les niveaux de radon et garantir une bonne qualité de l’air dans
votre logement, aérer les pièces du logement au moins 10 minutes par jour, en
toute saison.', 'IRSN et MSS
https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4811, false, false, NULL, 0, 1, false, false, false, '{3}', 'ℹ️ Le radon est un gaz radioactif naturel présent dans le sol et les roches.
Il est classé cancérigène certain pour le poumon par le Centre international
de recherche sur le cancer depuis 1987. Le potentiel radon fournit un niveau
de risque relatif à l''échelle d''une commune. Pour le consulter, l’Institut de
radioprotection et de sûreté nucléaire met à disposition une
[cartographie](https://tinyurl.com/carto-radon) qui classe les communes en
trois zones allant du potentiel faible au potentiel significatif. En savoir
plus [ici](https://tinyurl.com/mss-radon). 💡 Le potentiel radon d’une commune
ne présage en rien des concentrations présentes dans votre habitation :
celles-ci dépendent de multiples autres facteurs (étanchéité de l''interface
entre le bâtiment et le sol, taux de renouvellement de l''air intérieur, etc.).', false, false, NULL, false, '📍 Le niveau de risque radon de votre commune est élevé.

Pour réduire les niveaux de radon et garantir une bonne qualité de l’air dans
votre logement, aérer les pièces du logement au moins 10 minutes par jour, en
toute saison.', 'IRSN et MSS
https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Activité physique', NULL, NULL, NULL, false, NULL, NULL, false, 4577, false, false, NULL, NULL, NULL, NULL, NULL, true, '{}', 'ℹ️ Plus vous respirez d’air, plus vous respirez de pollen.

💡 Il vaut parfois mieux pratiquer du sport aux premières heures de la journée,
mais encore mieux lors de journées pluvieuses ou en salle.', NULL, true, NULL, false, 'Prendre son traitement de manière préventive avant une activité physique.', 'Allergologue

https://www.pollenundallergie.ch/infos-sur-pollens-et-allergies/conseils-prevention/?oid=1881&lang=fr', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, true, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, true, false, 4730, true, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les 3/4 du volume des produits appliqués seraient perdus et pollueraient
l''air extérieur.

💡Ne pas jeter les restes de produits à la poubelle, les rapporter en magasin
de jardinage ou en déchèterie.', true, true, false, false, 'En jardinant, éviter de pulvériser des pesticides par temps venteux.', 'Ademe', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4813, false, false, NULL, 0, 2, false, false, false, '{3}', 'ℹ️ Les effets du radon sur la santé sont liés à sa concentration dans l''air.
Si le radon se dilue très rapidement à l’extérieur, il peut s’accumuler et
atteindre des niveaux élevés dans les espaces clos tels que les bâtiments. Ces
niveaux dépendent des caractéristiques du sol et du bâtiment (type de
soubassement, ventilation, chauffage).

💡 Les travaux énergétiques peuvent conduire à un confinement des locaux. Il
est nécessaire de veiller à maintenir un bon système de ventilation.', false, false, NULL, false, '📍Le niveau de risque radon dans votre commune est élevé.

Pour réduire les niveaux de radon dans votre logement, s''assurer que les
entrées d’air ne sont pas obstruées et entretenir le système de ventilation.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', NULL, false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4814, false, false, NULL, 0, 3, false, false, false, '{2}', 'ℹ️ La mesure s’effectue sur une durée de deux mois, en période de chauffe du
logement, c’est-à-dire entre mi-septembre et fin avril. Il est conseillé de se
munir de trois détecteurs par logement. La liste des sociétés vendant des kits
de mesurage est disponible sur le [site de l’Institut de radioprotection et de
sûreté nucléaire (IRSN)](https://tinyurl.com/carto-radon) et de [l’Autorité de
sûreté nucléaire (ASN).](https://tinyurl.com/asn-radon)

💡 En France, le radon est la seconde cause de cancer du poumon, derrière le
tabagisme. Par ailleurs, de nombreuses études scientifiques ont montré que la
combinaison d’une exposition au tabac et d’une exposition élevée au radon fait
courir un risque individuel de cancer du poumon plus élevé que chacun des
facteurs pris individuellement.', false, false, NULL, false, '📍 Le niveau de risque radon de votre commune est moyen.

Pour connaître la concentration en radon dans votre logement, il est possible
de la mesurer en se procurant un kit de mesurage.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4819, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, true, NULL, false, 'Faire un diagnostic de la qualité de son air intérieur grâce à l''outil gratuit
["Un bon air chez moi"](https://unbonairchezmoi.developpement-
durable.gouv.fr/)', 'ADEME', 'deleted', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4600, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les moisissures ont des effets négatifs sur la santé, elles exacerbent les
allergies respiratoires et l''asthme. Les nettoyer dès les premières traces de
leur apparition et rechercher la cause (par exemple fuites d’eau, capillarité,
infiltration, etc.). Voici un guide pour les éliminer en toute sécurité :
[Lien de téléchargement](https://huit.re/guideeliminationmoisissures)', false, true, NULL, false, 'Nettoyer les traces de moisissures dans son logement.', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', '{}', false, false, false, false, true, false, 4761, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ L''ambroisie est une plante très allergisante dont le pollen, émis en fin
d''été, provoque de fortes réactions (rhinites, conjonctivites, asthme,
urticaire...) chez les personnes sensibles.

💡En France, depuis 2016, un nouveau [dispositif réglementaire
national](https://huit.re/ambroisie) spécifique à la lutte contre l''ambroisie
a été intégré dans le code de la santé publique.

⚠️ Il est déconseillé aux personnes sensibles au pollen de participer aux
actions de gestion.', false, false, NULL, false, 'Si des pieds d''ambroisie se trouvent sur votre terrain, vous êtes tenus de les
éliminer avant leur floraison en août.', 'MSS
https://solidarites-sante.gouv.fr/sante-et-environnement/risques-microbiologiques-physiques-et-chimiques/especes-nuisibles-et-parasites/ambroisie-info/

LegiFrance
https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000034503018?r=kftq6nHSrO

', 'hidden', false, 'pollens', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4815, false, false, NULL, 0, 4, false, false, false, '{2}', 'ℹ️ Des actions correctives d’aménagement des locaux peuvent compléter les
mesures d’aération :

  * réaliser des étanchements pour limiter l''entrée du radon dans le bâtiment (porte de cave, entrée de canalisation, fissure du sol, etc.) ;
  * rectifier les dysfonctionnements éventuels de la ventilation ;
  * améliorer ou rétablir l''aération naturelle du soubassement (ouverture des aérations du vide sanitaire ou de cave obturées). 

💡 Le radon est une cause importante de cancer du poumon, en particulier chez
les fumeurs.[En savoir plus.](https://tinyurl.com/mss-radon)', false, false, NULL, false, '📍 Le niveau de risque radon de votre commune est moyen.

Si la concentration en radon dans votre habitation se situe entre 300 Bq/m3 et
1 000 Bq/m3, réaliser des aménagements d’étanchement et de ventilation.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4839, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Protéger sa maison et les biens exposés au vent
- Limiter ses déplacements au strict minimum 
- Être vigilant aux chutes d’arbres et d’objets 
- Veiller à ce que les groupes électrogènes soient installés à l’extérieur de la maison pour éviter une intoxication au monoxyde de carbon en cas de coupure de courant 
- Se tenir informé auprès des autorités', 'https://www.interieur.gouv.fr/A-votre-service/Ma-securite/Conseils-pratiques/Conseils-face-aux-vigilances-meteo/Que-faire-en-cas-de-vigilance-vents-violents', 'published', false, 'vigilance_meteo', false, '{3}', '{1}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4656, false, false, NULL, NULL, NULL, false, false, false, '{}', 'ℹ️ Ils augmentent en général beaucoup les consommations. Certains ne sont pas
forcément sûrs : ils peuvent émettre du monoxyde de carbone, un gaz mortel
s’il est inhalé en grande quantité, et favoriser l’apparition de moisissures
du fait du dégagement d’humidité. [Plus
d’informations.](https://huit.re/chauffage)', false, true, NULL, false, 'Ne pas utiliser plus de deux heures un chauffage mobile d’appoint à combustion
(type de chauffage poêle à pétrole ou à gaz) et bien aérer en cas
d''utilisation.', 'Sources MSS/EA
 Ademe pour la précision : https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffer-mieux-moins-cher.pdf', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4820, false, false, 0, 0, NULL, false, false, false, '{}', '', false, true, false, false, 'À vélo ou à pied, choisir dès que possible un itinéraire évitant les grands axes routiers.', 'Infographies MSS : 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_generale.pdf 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_enfants.pdf
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_age.pdf', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4841, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- S’éloigner des arbres et des cours d''eau et s’abriter dans un bâtiment en dur
- Se tenir informé et éviter les déplacements 
- Protéger les biens exposés au vent ou pouvant être inondés
- Eviter l’utilisation de son téléphone et des appareils électriques qui facilitent l’entrée de la foudre', '', 'published', false, 'vigilance_meteo', false, '{3}', '{3}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4840, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Fermer portes, fenêtres, et volets pour se protéger des dégâts sur les habitations
- Ne pas utiliser son véhicule pour éviter qu’il soit déporté 
- Rester chez soi autant que possible 
- Se tenir informé auprès des autorités', 'Météo France : https://vigilance.meteofrance.fr/fr/consequences-conseils-vents-violents-orange', 'published', false, 'vigilance_meteo', false, '{4}', '{1}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4879, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Ne pas boire directement l''eau de baignade (mer, fleuve, rivière, etc.). ', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4880, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Ne pas toucher les animaux vivants ou morts à proximité des zones de baignade.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4598, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les moisissures ont des effets négatifs sur la santé, elles exacerbent les
allergies respiratoires et l''asthme.

💡 En cas de détection de moisissure, il est déconseillé aux personnes
atteintes de pathologies respiratoires de nettoyer elles-mêmes les
moisissures. Contacter son propriétaire si le problème est récurrent.

[Pour en savoir plus](https://huit.re/fiche-moisissure)', false, true, NULL, false, 'Pour éviter le développement de moisissures, aérer quotidiennement son
logement notamment lors d''activité produisant de l''humidité (douche, cuisine,
séchage du linge…).', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, true, false, 'Activité extérieure', '{}', false, false, false, NULL, false, false, 4665, true, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Dans les jardins et espace extérieurs, il est important de faire attention
au potentiel allergisant des plantes.

💡 Attention à ne pas nuire à la biodiversité pour autant : planter des espèces
variées permet aussi de diminuer la concentration de pollens d’une même espèce
dans l’air, réduisant les risques d’allergies.', false, false, NULL, false, 'Favoriser la plantation de plantes et d’arbres peu allergisants dans les
espaces extérieurs.', 'RNSA
https://www.pollens.fr/le-reseau/allergie

https://huit.re/vegetation', 'hidden', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4847, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Rester chez soi autant que possible en s’organisant à l’avance.
- Chauffer sans surchauffer son logement mais s’habiller chaudement, avec plusieurs couches de vêtements.
- Ne pas boucher les entrées d''air de son logement pour se prémunir d’un risque mortel d''intoxication au monoxyde de carbone.
- Aérer une fois par jour, même si les températures sont basses. 
- Ne pas faire fonctionner en continue les chauffages d''appoint. Ne pas utiliser de chauffage de fortune (cuisinières, braséros, four, etc.).', 'Météo France', 'published', false, 'vigilance_meteo', false, '{3}', '{7}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4846, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Rester chez soi autant que possible 
- Si immobilisé sur la route, quitter son véhicule uniquement sur ordre des autorités 
- Veiller à ce les groupes électrogènes soient installés à l''extérieur de la maison pour éviter une intoxication au monoxyde de carbone en cas de coupure de courant', 'Météo France', 'published', false, 'vigilance_meteo', false, '{4}', '{5}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4608, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ L''humidité d''un logement peut avoir des effets néfastes sur la santé et
déclencher des allergies et/ou de l''asthme. Elle favorise la colonisation de
champignons microscopiques plus communément appelés moisissures.', false, true, NULL, false, 'En cas d''humidité dans son logement, faire contrôler le système de
ventilation. L''air intérieur n’est certainement pas assez renouvelé.', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4612, false, true, NULL, 0, NULL, false, false, false, '{}', '💡 Conserver les produits en spray, les diffuseurs d''huiles essentielles et les
parfums d''intérieur hors de portée des enfants. [Plus
d''informations](https://huit.re/infographie-ademe)', false, true, NULL, false, 'Lors de la fabrication de produits ménagers maison, limiter le nombre
d’ingrédients et les quantités d’huiles essentielles.', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, true, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4695, false, true, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Pour connaître la signification des pictogrammes de danger présents sur les
étiquettes : https://huit.re/pictogrammes-produits.

💡Une étiquette « 100 % naturel » ou «à base de produits naturels» peut être
trompeuse.', false, true, NULL, false, 'Lors de l''utilisation de produits ménagers ou de bricolage, respecter les
dosages et les consignes d’utilisation des produits sur les étiquettes (ex :
«ne pas utiliser dans un local fermé», «ne pas inhaler les vapeurs», «temps de
séchage des peintures à respecter»...).', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4603, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ L''humidité d''un logement peut avoir des effets néfastes sur la santé et
déclencher des allergies et/ou de l''asthme. Elle favorise la colonisation de
champignons microscopiques plus communément appelés moisissures. Si vous avez
une hotte aspirante, activez la.

💡Mettre un couvercle sur les casseroles vous permettra aussi de réduire votre
consommation d''énergie !', false, true, NULL, false, 'En cuisine, mettre un couvercle sur les casseroles pour réduire l''humidité
dans son logement et économiser de l''énergie.', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison
  Guide de la pollution de l''air intérieur de l''Inpes', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4859, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Des phénomènes habituels dans la région mais occasionnellement et localement dangereux sont prévus aujourd''hui. Soyez attentifs si vous pratiquez des activités sensibles au risque météorologique ou exposées aux crues.', 'Météo France', 'published', false, 'vigilance_meteo', false, '{2}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4605, false, false, 0, 0, NULL, false, false, false, '{}', '💡Moins de climatisation, c’est 15 % de CO2 rejetés en moins sur 100 km.', false, true, false, false, 'En voiture, réserver l''utilisation de la climatisation aux périodes de fortes chaleurs avec un écart de température avec l''extérieur au maximum de 5°C.', 'https://www.airparif.asso.fr/_pdf/les-petits-gestes-au-quotidien.pdf
 http://www.gwadair.fr/l-air/actions-d-amelioration', 'hidden', false, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', '{}', false, false, false, NULL, false, false, 4637, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Les lunettes retiennent une partie du pollen qui pourrait arriver dans vos
yeux et limitent votre éblouissement.

💡Les yeux sont en effet plus sensibles à la lumière lorsque la conjonctive est
irritée par une réaction allergique.', false, false, NULL, false, 'En période de pollinisation, il est conseillé de porter des lunettes de
soleil.', 'https://www.atmo-bfc.org/tout-sur-l-air/pollens

ATMO : Nouvelle aquitaine
https://www.atmo-nouvelleaquitaine.org/article/les-pollens

https://www.pollenundallergie.ch/infos-sur-pollens-et-allergies/conseils-prevention/?oid=1881&lang=fr', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Appareil de Combustion', NULL, false, false, false, NULL, false, false, 4675, false, false, NULL, NULL, NULL, false, false, false, '{}', 'ℹ️ Le chauffage représente en moyenne 60% de la consommation totale d''énergie
d''un logement. Les types de chauffages les plus chers sont le chauffage
électrique et le chauffage au fioul. [Pour apprendre à se chauffer moins
cher](https://huit.re/chauffage-guide).', false, true, NULL, false, 'Il est conseillé de confier l’installation des appareils de combustion à des
professionnels qualifiés et de les utiliser conformément à leur notice
d’utilisation fournie par le fabricant.', 'OQAI, "les bons gestes pour un bon air".', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4881, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Ne pas jeter ou enterrer les déchets dans le sable (papiers, mégots, restes alimentaires, etc.), utiliser les poubelles mises à disposition.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, true, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4727, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ L''usage de l''amiante est interdit en France depuis le 1er janvier 1997,
mais certains matériaux mis en œuvre avant cette date peuvent en contenir
(calorifugeages des conduits de chauffage, plaques de faux plafonds, amiante
ciment pour les canalisations, bardage ou toitures, certains revêtements de
sols...).', false, true, NULL, false, 'Lors de travaux de bricolage, faire attention à l''amiante. Faire appel à un
professionnel qualifié en cas d''intervention directe sur des matériaux
amiantés.', 'Ademe', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4828, false, false, NULL, 1, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Favoriser l’ouverture des fenêtres avant le lever et après le coucher du
soleil pour éviter que les pollens ne pénètrent dans le logement.', 'RNSA', 'hidden', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', NULL, false, false, false, NULL, false, false, 4642, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ La montée des températures précédant les orages favorisent la prolifération
des pollens.

💡 La pluie et l''humidité alourdissent l’air : les pollens transportés par les
vents se déplacent beaucoup plus près du sol, ce qui facilite leur respiration
et multiplie les cas d’allergies.', false, false, NULL, false, 'Éviter de sortir immédiatement après l''orage.', 'https://www.atmo-bfc.org/tout-sur-l-air/pollens

Allergologue Marie-Laure Mégret Gabeaud.
https://www.lci.fr/sante/orages-le-calvaire-des-allergiques-aux-pollens-2090238.html

', 'deleted', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, NULL, false, false, 'Activité extérieure', NULL, NULL, NULL, false, NULL, NULL, false, 4639, true, false, NULL, NULL, NULL, NULL, NULL, false, '{}', 'Contradictoire avec la 68.', NULL, NULL, NULL, false, 'Tondre régulièrement sa pelouse en dehors des périodes de pollinisation.', 'https://www.atmo-bfc.org/tout-sur-l-air/pollens', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, false, 4640, false, false, NULL, 1, NULL, false, false, false, '{}', '💡 Le polyuréthane est une mousse inflammable qui contient des retardateurs de
feu dont les substances peuvent être inhalées.', false, false, NULL, false, 'Choisir une literie anti-acarienne (rembourrage en latex, coton, laine) plutôt
que du polyuréthane.', 'ATMO Nouvelle Aquitaine', 'deleted', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, true, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4707, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ La présence d''animaux de compagnie dans un logement peut déclencher des
allergies, notamment chez les enfants.

💡 Les allergènes ne sont pas directement liés aux poils des animaux, elles
sont sécrétées par les animaux et présentes dans tous les liquides corporels :
larmes, salives, urines, glandes anales, glandes sébacées... Il existe une
glande à la base de chaque poil qui sécrète l''allergène rendant les poils
allergisants. En se léchant, l''animal en ajoute sur le poil.', false, false, NULL, false, 'Il est conseillé de laver régulièrement les animaux de compagnie, de les
brosser si possible à l’extérieur.', 'Guide Inpes sur la QAI', 'hidden', false, 'pollens', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, NULL, false, false, 'Radon', NULL, NULL, NULL, false, NULL, NULL, false, 4692, false, false, NULL, NULL, NULL, NULL, NULL, false, '{}', E'💡 En zone d’exposition au radon, les méthodes d’atténuation sont choisies au
cas par cas : \\- améliorer le renouvellement de l''air intérieur; \\- renforcer
l''étanchéité entre le sol et le bâtiment; \\- mettre le logement en surpression
via une ventilation double flux par exemple, pour ne pas retenir le radon dans
le sol.', NULL, NULL, NULL, false, 'Le [département] est classé prioritaire face au risque radon, il existe des
mesures de réduction appropriées en fonction de la concentration en radon dans
son logement.', 'OQAI, "les bons gestes pour un bon air".', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Santé', '{}', false, false, false, NULL, false, false, 4626, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Les cheveux retiennent les pollens et graminés qui vont se déposer sur
l''oreiller, ce qui peut gêner la respiration pendant le sommeil.

💡Après une douche ou un bain ne pas oublier d''aérer la pièce.', false, false, NULL, false, 'En saison pollinique, brosser ou rincer ses cheveux avant de se coucher le
soir.', 'ATMO Grand Est', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Déplacements', '{}', false, false, false, NULL, false, false, 4740, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Selon [l''ADEME](https://multimedia.ademe.fr/infographies/infographie-la-
mobilite-ademe/), se déplacer à vélo permettrait d''économiser 650kg de CO2 par
personne et par an.

💡Soit l’équivalent d’une télévision LCD allumée 162 jours non-stop !', false, true, NULL, false, 'En ville, privilégier l''usage du vélo pour vos déplacements afin de réduire
votre impact environnemental.', 'Ademe', 'deleted', true, 'indice_atmo', true, NULL, NULL, true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4591, true, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les pesticides incluent les insecticides, les herbicides ou désherbants,
les anti-nuisibles et les fongicides. Leur toxicité pour l’homme peut être
grave en cas d’absorption accidentelle, d’inhalation forte ou de contact avec
la peau.

💡Depuis janvier 2019, la vente des pesticides chimiques est interdite.', false, true, false, false, 'En jardinant, éviter d''utiliser des pesticides chimiques dangereux pour la
santé et l''environnement.', 'ATMO, https://www.atmo-nouvelleaquitaine.org/article/les-bons-gestes-adopter-dans-mon-jardin', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4644, false, false, 0, 0, NULL, false, false, false, '{}', '💡Une voiture mal entretenue pollue plus. Réviser son véhicule régulièrement
permet de faire des économies et de limiter ses émissions de polluants.', false, true, false, false, 'Changer le filtre à air de votre véhicule une fois par an pour éviter la
surconsommation, la pollution et même la panne moteur.', 'https://www.atmo-bfc.org/tout-sur-l-air/agir-pour-l-air', 'hidden', false, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Déplacements', NULL, false, false, false, false, false, false, 4576, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Plus vous respirez d’air, plus vous respirez de pollen.

💡 Il vaut mieux pratiquer du sport aux premières heures de la journée ou en
fin de journée, c’est à ce moment là que les concentrations de pollens sont
les plus basses.', false, false, NULL, false, 'En cas de sortie pour pratiquer une activité physique, ne pas oublier son
traitement d''urgence.', 'MSS', 'deleted', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Santé', '{}', false, false, false, NULL, false, false, 4638, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Faire un lavage du nez matin et soir avec un sérum physiologique permet
d''éliminer au fur et à mesure les pollens qui s''accumulent dans les muqueuses
nasales.', false, false, NULL, false, 'En période de pollinisation, il est recommandé de se laver régulièrement le
nez avec du sérum physiologique.', 'https://www.atmo-bfc.org/tout-sur-l-air/pollens

https://www.santemagazine.fr/sante/maladies/allergies/allergies-respiratoires/rhume-des-foins-allergie-les-gestes-pour-se-proteger-des-pollens-178388#:~:text=Se%20laver%20le%20nez%20pour,accumulent%20dans%20les%20muqueuses%20nasales.', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4689, false, false, NULL, 0, NULL, false, false, false, '{}', E'💡 Il existe deux types de hottes aspirantes : \\- les hottes à extractions :
elles rejettent l''air aspiré à l''extérieur du bâtiment par un conduit
d''évacuation. \\- les hottes à recyclage : elles renvoient dans la cuisine
l''air aspiré et filtré.', false, true, NULL, false, 'Utiliser et entretenir sa hotte de cuisine (nettoyer ou changer les filtres)
régulièrement.', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{"bois"}', false, false, false, NULL, false, false, 4715, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ L''utilisation d''un foyer fermé préserve mieux la qualité de votre air
intérieur car elle limite l''émission de particules fines.', false, true, NULL, false, 'Pour le chauffage au bois, préférer une cheminée à foyer fermé plutôt qu''à
foyer ouvert.', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', '{}', false, false, false, false, false, false, 4765, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Garder la fenêtre ouverte durant la nuit favorise la pénétration des
pollens dans le logement.

💡 Si necessaire, des filtres à pollen peuvent être installés sur les fenêtre
pour permettre l’aération sans risque.', false, false, NULL, false, 'En période pollinique, il est déconseillé de dormir la fenêtre ouverte.', 'ATMO : Nouvelle aquitaine
https://www.atmo-nouvelleaquitaine.org/article/les-pollens
Source : Afeda

https://www.pollenundallergie.ch/infos-sur-pollens-et-allergies/conseils-prevention/?oid=1881&lang=fr', 'deleted', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, true, NULL, false, 'Activité physique', NULL, false, false, false, NULL, false, false, 4780, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️Les concentrations de polluants observées dans l’air en France y compris
pendant les épisodes de pollution, ne remettent pas en cause les bénéfices de
la pratique régulière d’activité physique, à l’extérieur comme à l’intérieur
des bâtiments.

💡Cependant, étant donné que l’on peut inhaler un plus grand volume d’air lors
de la pratique d’une activité physique (selon l’intensité de l’activité
pratiquée, de l’état de santé de la personne…), et donc potentiellement une
plus grande quantité de polluants de l’air, il est préférable de pratiquer les
activités physiques le plus possible à l’écart des sources majeures de
pollution.', false, false, NULL, true, 'Même en cas de mauvaise qualité de l''air, il est possible de pratiquer une
activité physique en extérieur.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/air-exterieur/qualite-de-l-air-exterieur-10984/article/recommandations-en-cas-d-episode-de-pollution#:~:text=%C3%A9vitez%20les%20activit%C3%A9s%20physiques%20et,l''int%C3%A9rieur%20peuvent%20%C3%AAtre%20maintenues.&text=professionnel%20de%20sant%C3%A9.%20%3B-,privil%C3%A9giez%20des%20sorties%20plus%20br%C3%A8ves%20et,demandent%20le%20moins%20d''effort.', NULL, false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Activité physique', '{}', false, false, false, NULL, false, false, 4627, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Le nez fonctionne comme un filtre permettant de réduire la quantité de
pollens inspirés.

💡En ca sde nez bouché, réaliser un nettoyage avec un spray nasal avant la
pratique sportive.', false, false, NULL, false, 'Lors des activités physiques, il est conseillé d''inspirer par le nez plutôt
que par la bouche afin de faire entrer moins de pollens dans les poumons.', 'ATMO Grand Est', 'deleted', false, 'pollens', true, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, true, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, true, 4723, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Un système de chauffage moderne permet de se chauffer mieux et moins cher,
en émettant moins de polluants dans l''air.

💡Il est conseillé de choisir une chaudière à haute performance énergétique,
une chaudière au bois, ou encore une pompe à chaleur.
[FAIRE](https://www.faire.gouv.fr/) est le service public qui vous guide dans
vos travaux de rénovation énergétique.', false, true, NULL, false, 'Si votre système de chauffage a plus de 15 ans, il est conseillé de le faire
remplacer.', 'Ademe : https://www.ademe.fr/sites/default/files/assets/documents/fiche-entretien-des-chaudieres.pdf', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', NULL, false, false, false, NULL, false, true, 4704, false, false, NULL, NULL, NULL, false, false, false, '{}', '💡Durant l''aération, il est conseillé d''éteindre ou de baisser au minimum les
appareils de chauffage du logement pour ne pas dépenser inutilement de
l’énergie. Veillez à les remettre en marche une fois les fenêtres refermées.', false, true, NULL, false, 'Même en hiver, il est important d''aérer son logement en ouvrant les fenêtres.', 'Guide de la pollution de l''air intérieur de l''Inpes (l''Inpes n''existant plus, nous ne pouvons plus renvoyer vers ce guide) : https://solidarites-sante.gouv.fr/IMG/pdf/Guide_INPES_Pollution_de_l_air_interieur.pdf', 'published', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, '', '{}', false, false, false, false, false, false, 4756, true, false, NULL, 4, NULL, false, false, false, '{}', 'ℹ️ En cas de nécessité, privilégier la fin de journée et le port de lunettes
de protection et de masque pour vos activités extérieures.', false, true, NULL, true, 'Réduire les activités extérieures qui entraînent une sur-exposition aux
pollens (tonte du gazon, entretien du jardin, activités sportives, etc.)', 'MSS
Conseil de la santé publique (HCSP) 
avis publié le 28 avril 2016', 'published', false, 'pollens', true, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, NULL, false, false, 'Activité extérieure', NULL, NULL, NULL, false, NULL, NULL, false, 4589, false, false, NULL, NULL, NULL, NULL, NULL, false, '{}', '', NULL, NULL, NULL, false, 'Acheter local et de saison dans la mesure du possible', 'ATMO', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, false, true, false, false, false, 'Air intérieur', '{"bois"}', false, false, false, false, false, true, 4775, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Un bon stockage permet au bois de bien sécher et aux granulés de garder
toute leurs qualités.

💡 Prévoir 10 à 15 bûches à côté de votre foyer, 24 à 48 heures avant de les
utiliser pour parfaire le séchage.', false, true, false, false, 'Entreposer le combustible du chauffage au bois dans un local sec et bien
ventilé (garage, cave ventilée), de préférence légèrement surélevé.', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, 'Activité physique', '{}', false, false, false, NULL, false, false, 4779, false, false, NULL, 0, NULL, false, false, true, '{}', 'ℹ️ Lorsque la qualité de l''air se dégrade, il est conseillé aux personnes
vulnérables (personnes ayant une pathologie respiratoire, allergique, femmes
enceintes...) de réduire les activités physique intenses comme la course à
pied.

💡Pour ne pas rester sédentaire, privilégier des activités plus modérées comme
la marche.', false, false, NULL, true, 'En cas de mauvaise qualité de l''air, limiter les activités physiques intenses.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/air-exterieur/qualite-de-l-air-exterieur-10984/article/recommandations-en-cas-d-episode-de-pollution#:~:text=%C3%A9vitez%20les%20activit%C3%A9s%20physiques%20et,l''int%C3%A9rieur%20peuvent%20%C3%AAtre%20maintenues.&text=professionnel%20de%20sant%C3%A9.%20%3B-,privil%C3%A9giez%20des%20sorties%20plus%20br%C3%A8ves%20et,demandent%20le%20moins%20d''effort.', 'deleted', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, true, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4728, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les solvants organiques fluidifient la peinture, facilitent son application
et permettent le nettoyage des équipements. Mais, ils présentent des risques
pour la santé, polluent l''environnement (émission de COV) et sont très
inflammables.

💡 Tous les restes de peinture doivent être apportés en déchèterie.', false, true, NULL, false, 'Lors de travaux de rénovation, choisir des peintures acryliques ou minérales
ne contenant pas ou peu de solvants organiques.', 'Ademe', 'hidden', false, 'indice_atmo', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', '{}', false, false, false, false, false, false, 4753, false, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Les cheveux mouillés retiennent les pollens et peuvent donc aggraver les
symptômes allergiques.

💡 Il est conseillé de se brosser les cheveux le soir, en dehors de sa chambre
à coucher.', false, false, NULL, false, 'En période de pollinisation, éviter de sortir avec les cheveux mouillés.', 'ATMO : Nouvelle aquitaine
https://www.atmo-nouvelleaquitaine.org/article/les-pollens
', 'published', false, 'pollens', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Activité physique', NULL, true, true, true, true, NULL, false, 4573, false, false, NULL, NULL, NULL, false, true, true, '{}', 'ℹ️ Une "activité modérée" est par exemples : marcher d''un pas vif, jardiner,
s''acquitter de travaux ménagers, participer activement à des jeux et sports
avec des enfants, sortir son animal domestique, faire du bricolage, déplacer
de lourdes charges.', NULL, false, NULL, false, '⚠️ Privilégier les activités modérées.', 'Arrêté du 13 mars 2018 modifiant l’arrêté du 20 août 2014 relatif aux recommandations sanitaires en vue de prévenir les effets de la pollution de l’air sur la santé, pris en application de l’article R. 221-4 du code de l’environnement', 'deleted', false, 'episode_pollution', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Activité physique', NULL, false, false, true, true, NULL, false, 4584, false, false, NULL, NULL, NULL, true, false, true, '{}', 'ℹ️ Une activité physique sportive et intense est une activité qui oblige à
respirer par la bouche.

💡 Par exemples : courir, grimper une côte à vive allure, faire du vélo à vive
allure, faire de l''aérobic, nager à vive l''allure, faire des sports et jeux de
compétition (par ex. jeux traditionnels, football, volleyball, hockey,
basketball)...', NULL, false, NULL, false, '⚠️ Eviter les activités physiques et sportives intenses (dont les
compétitions) en plein air ; celles peu intenses à l’intérieur peuvent être
maintenues.', 'Arrêté du 13 mars 2018 modifiant l’arrêté du 20 août 2014 relatif aux recommandations sanitaires en vue de prévenir les effets de la pollution de l’air sur la santé, pris en application de l’article R. 221-4 du code de l’environnement', 'deleted', false, 'episode_pollution', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, false, false, false, false, false, '', NULL, true, true, false, true, false, false, 4746, false, false, NULL, 0, NULL, false, true, true, '{}', '', false, false, NULL, false, '* Privilégier des sorties plus brèves et celles qui demandent le moins d''effort.
  * Éviter les zones à fort trafic routier, aux périodes de pointe.
  * Privilégier les activités modérées.
  * En cas de gêne respiratoire ou cardiaque, prendre conseil auprès d''un professionnel de santé.
  * Prendre conseil auprès de votre médecin pour savoir si votre traitement médical doit être adapté le cas échéant.', 'Arrêté du 13 mars 2018', 'deleted', false, 'episode_pollution', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4806, false, false, NULL, 0, 3, false, false, false, '{3}', 'ℹ️ Le radon est un gaz radioactif naturel présent dans le sol et les roches.
Le potentiel radon fournit un niveau de risque relatif à l''échelle d''une
commune. Il ne présage en rien des concentrations présentes dans votre
habitation : celles-ci dépendent de multiples autres facteurs (étanchéité de
l''interface entre le bâtiment et le sol, taux de renouvellement de l''air
intérieur, etc.). Seul un mesurage permet de connaître la concentration en
radon dans votre habitation.

💡 Le mesurage doit refléter l''exposition moyenne des habitants. Pour cela, un
détecteur doit être installé dans une ou plusieurs pièces de vie pendant au
moins deux mois et durant la période de chauffage (entre mi-septembre et fin
avril). Il est possible de procéder soit même à la mesure en acquérant des
détecteurs radon auprès de l''une des sociétés qui les produisent et qui
disposent de laboratoires permettant de les analyser. La liste des sociétés
vendant des kits de mesurage est disponible sur le [site de l’Institut de
radioprotection et de sûreté nucléaire (IRSN)](https://tinyurl.com/kit-radon)', false, false, NULL, false, '📍 Le niveau de risque radon de votre commune est élevé.

Pour mesurer la concentration en radon dans votre habitation, se procurer un
kit de mesurage à mettre en place chez soi durant au moins 2 mois, entre fin
septembre et fin avril (période de chauffe de votre logement).', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4698, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Dans les environnements intérieurs, la combustion d’encens représente une
source significative de polluants volatils (notamment de benzène) et de
particules.

💡En cas d''utilisation, bien aérer son logement.', false, true, NULL, false, 'Limiter l''utilisation de parfums d’ambiance, bougies ou encens qui dégradent l''air intérieur.', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', '{}', false, false, false, false, false, false, 4759, true, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ Une taille régulière des arbres, haies, gazon… empêche les fleurs
d’apparaître et ainsi diminue la quantité de grain de pollen dans l’air.', false, false, NULL, false, 'Il est conseillé de tailler les plantes avant l’apparition des fleurs pour
diminuer la quantité de pollen émis.', 'Thèse en pharmarcie Université de Picardie : "LES PLANTES COMMUNES
ALLERGENES ET TOXIQUES DANS
LES JARDINS PICARDS" https://dumas.ccsd.cnrs.fr/dumas-01366665/document', 'hidden', false, 'pollens', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4807, false, false, NULL, 0, 4, false, false, false, '{3}', 'ℹ️ Ces actions simples, ne mettant pas en œuvre des travaux lourds sur le
bâtiment, permettent d''abaisser suffisamment la concentration en radon
lorsqu’elle ne dépasse pas 1 000 Bq/m3.

💡 Les effets du radon sur la santé sont liés à sa concentration dans l''air. Si
le radon se dilue très rapidement à l’extérieur, il peut s’accumuler et
atteindre des concentrations élevées dans les espaces clos. Ces concentrations
dépendent des caractéristiques du sol et du logement (aération, matériaux de
construction, chauffage).', false, false, NULL, false, '📍 Le niveau de risque radon de votre commune est élevé.

Pour réduire les niveaux de radon et garantir une bonne qualité de l’air dans
votre logement, aérer régulièrement les pièces et s’assurer du bon
fonctionnement du système de ventilation.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4805, false, false, NULL, 0, 4, false, false, false, '{1}', 'ℹ️ Des actions correctives d’aménagement des locaux peuvent compléter les
mesures d’aération :

  * réaliser des étanchements pour limiter l''entrée du radon dans le bâtiment (porte de cave, entrée de canalisation, fissure du sol, etc.) ;
  * rectifier les dysfonctionnements éventuels de la ventilation ;
  * améliorer ou rétablir l''aération naturelle du soubassement (ouverture des aérations du vide sanitaire ou de cave obturées). 

💡 Le radon est une cause importante de cancer du poumon, en particulier chez
les fumeurs.[En savoir plus.](https://tinyurl.com/mss-radon)', false, false, NULL, false, '📍 Le niveau de risque radon de votre commune est moyen.

Si la concentration en radon dans votre habitation se situe entre 300 Bq/m3 et
1 000 Bq/m3, réaliser des aménagements d’étanchement et de ventilation.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4803, false, false, NULL, 0, 2, false, false, false, '{1}', 'ℹ️ Les effets du radon sur la santé sont liés à sa concentration dans l''air.
Si le radon se dilue très rapidement à l’extérieur, il peut s’accumuler et
atteindre des niveaux élevés dans les espaces clos tels que les bâtiments. Ces
niveaux dépendent des caractéristiques du sol et du bâtiment (type de
soubassement, ventilation, chauffage).

💡 Les travaux énergétiques peuvent conduire à un confinement des locaux. Il
est nécessaire de veiller à maintenir un bon système de ventilation.', false, false, NULL, false, '📍Le niveau de risque radon dans votre commune est faible.

Pour réduire les niveaux de radon dans votre logement, s''assurer que les
entrées d’air ne sont pas obstruées et entretenir le système de ventilation.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4882, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Signaler toute présence de déchets dangereux (par exemple de seringues) au poste de secours ou à la mairie.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4808, false, false, NULL, 0, 5, false, false, false, '{3}', 'ℹ️ Des actions correctives d’aménagement des locaux peuvent compléter les
mesures d’aération :

  * réaliser des étanchements pour limiter l''entrée du radon dans le bâtiment (porte de cave, entrée de canalisation, fissure du sol, etc.) ;
  * rectifier les dysfonctionnements éventuels de la ventilation ;
  * améliorer ou rétablir l''aération naturelle du soubassement (ouverture des aérations du vide sanitaire ou de cave obturées). 

💡 Le radon est une cause importante de cancer du poumon, en particulier chez
les fumeurs.[En savoir plus.](https://tinyurl.com/mss-radon)', false, false, NULL, false, '📍 Le niveau de risque radon de votre commune est élevé.

Si la concentration en radon dans votre habitation se situe entre 300 Bq/m3 et
1 000 Bq/m3, réaliser des aménagements d’étanchement et de ventilation.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo
', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4816, false, false, NULL, 0, 2, false, false, false, '{3}', 'ℹ️ Les effets du radon sur la santé sont liés à sa concentration dans l''air.
Si le radon se dilue très rapidement à l’extérieur, il peut s’accumuler et
atteindre des niveaux élevés dans les espaces clos tels que les bâtiments. Ces
niveaux dépendent des caractéristiques du sol et du bâtiment (type de
soubassement, ventilation, chauffage).

💡 Les travaux énergétiques peuvent conduire à un confinement des locaux. Il
est nécessaire de veiller à maintenir un bon système de ventilation.', false, false, NULL, false, '📍Le niveau de risque radon dans votre commune est élevé.

Pour réduire les niveaux de radon dans votre logement, s''assurer que les
entrées d’air ne sont pas obstruées et entretenir le système de ventilation.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon
https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YTnai9MzZmo', 'deleted', false, 'radon', false, NULL, NULL, false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', '{}', false, false, false, false, false, false, 4758, true, false, NULL, 1, NULL, false, false, false, '{}', 'ℹ️ L''eau permet de plaquer les pollens au sol ce qui les empêche d''atteindre
les voies respiratoires.', false, false, NULL, false, 'Arroser les plantes en fin de journée pour faire retomber les pollens.', 'RNSA
https://www.pollens.fr/le-reseau/allergie', 'hidden', false, 'pollens', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, true, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, true, 4735, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ La pluie lessive certains polluants de l''air et le vent les disperse,
permettant de réduire la quantité de polluants inhalés lors de la pratique
sportive.', true, true, false, false, 'Faire du sport en extérieur après une averse permet de limiter l''impact de la
pollution de l''air sur la santé.', 'Airducation', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4817, false, false, 0, 0, NULL, false, false, false, '{}', '', false, true, false, false, 'Pratiquer une activité physique en extérieur en privilégiant les parcs et
zones piétonnes, en dehors des heures de pointe.', 'Infographies MSS : 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_generale.pdf 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_enfants.pdf
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_age.pdf', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4570, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Lors d''une forte densité de trafic, dans un tunnel ou sur un axe
congestionné, il est préférable de configurer sa voiture en ventilation à
débit moyen, en mode recyclé avec vitres fermées. Cela permet de limiter
l’infiltration du NO2, des particules et d’autres polluants issus du trafic.

💡Dans les tunnels, les concentrations de polluants à l’intérieur de
l’habitacle du véhicule sont en moyenne 2 fois plus élevées que celles en-
dehors des tunnels. [En savoir plus](l.incubateur.net/oWVM)', false, true, NULL, false, 'En voiture, éviter d’aérer son véhicule à proximité d’autres sources de
pollution, par exemple en zone de trafic dense ou dans les tunnels.', 'https://www.airparif.asso.fr/en-voiture#:~:text=Dans%20les%20tunnels%2C%20les%20concentrations,sur%20les%20axes%20moins%20fr%C3%A9quent%C3%A9s.', 'hidden', false, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4618, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les épurateurs d’air (appareils, sprays assainissants…) n’ont pas
d’efficacité prouvée en conditions réelles d’utilisation. [Plus
d''informations.](https://www.ademe.fr/sites/default/files/assets/documents/avis-
technique-epuration-air-interieur-par-photocatalyse-2020.pdf)

💡L’aération et la ventilation restent les moyens les plus efficaces
d''améliorer votre air intérieur.', false, true, NULL, false, 'Utiliser un purificateur d''air chez soi ne garantit pas un air sain.', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison
  Expertise Anses sur les épurateurs d''air : https://www.anses.fr/fr/content/%C3%A9purateurs-d%E2%80%99air-int%C3%A9rieur-une-efficacit%C3%A9-encore-%C3%A0-d%C3%A9montrer', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4617, false, false, NULL, 0, NULL, false, false, false, '{}', 'ℹ️ Les tests réalisés démontrent que dans les bâtiments, l’efficacité
d’épuration de l’air par les plantes seules est inférieure à l’effet du taux
de renouvellement de l’air sur les concentrations de polluants. [Plus
d''informations](https://huit.re/plante-air).

💡 L’aération et la ventilation restent bien plus efficaces que l’épuration par
les plantes.', false, true, NULL, false, 'Les plantes n''ont pas d''effet "dépolluant" sur l''air intérieur.', 'ADEME
https://www.ademe.fr/plantes-epuration-lair-interieur', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4857, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Pas de vigilance particulière aujourd''hui. ', 'Météo france', 'published', false, 'vigilance_meteo', false, '{1}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4858, false, false, NULL, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Des phénomènes habituels dans votre région mais occasionnellement et localement dangereux son prévus aujourd''hui.  Soyez attentifs si vous pratiquez des activités sensibles au risque météorologique ou exposées aux crues.', 'Météo France', NULL, false, 'vigilance_meteo', false, '{2}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, false, false, false, 4768, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ En France, 60% des trajets effectués en voiture en France font moins de 5
km ! Pour calculer l''impact de vos déplacements sur le climat, essayez le
simulateur [Mon impact transport](https://monimpacttransport.fr/).', false, true, false, true, 'Pour limiter la pollution de l’air, éviter d''utiliser sa voiture pour les
petits trajets (moins de 2 km) car le moteur n''a pas le temps de chauffer.', 'https://www.airparif.asso.fr/_pdf/les-petits-gestes-au-quotidien.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4823, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, true, 'Ne pas aggraver les effets de la pollution en ajoutant des facteurs irritants
: fumée de tabac, utilisation de solvants en espace intérieur, chauffage au
bois, exposition aux pollens en saison, etc.', 'Avis du HCSP  ', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4883, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Vérifier si la plage est autorisée ou interdite aux animaux de compagnie.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4835, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, true, 'Même en cas de mauvaise qualité de l''air, il est possible de pratiquer une activité physique en extérieur. Pour les personnes sensibles et vulnérables, il est conseillé de réduire l''intensité de l''activité.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/air-exterieur/qualite-de-l-air-exterieur-10984/article/recommandations-en-cas-d-episode-de-pollution#:~:text=%C3%A9vitez%20les%20activit%C3%A9s%20physiques%20et,l''int%C3%A9rieur%20peuvent%20%C3%AAtre%20maintenues.&text=professionnel%20de%20sant%C3%A9.%20%3B-,privil%C3%A9giez%20des%20sorties%20plus%20br%C3%A8ves%20et,demandent%20le%20moins%20d''effort.', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4596, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ En France, 60% des trajets effectués en voiture font moins de 5 km ! Pour
calculer l''impact de vos déplacements sur le climat, essayez le simulateur
[Mon impact transport](https://monimpacttransport.fr/)', false, true, false, false, 'Eviter d''utiliser sa voiture pour les petits trajets (moins de 2 km) pour
lesquels le moteur n''a pas le temps de chauffer.', 'https://www.airparif.asso.fr/_pdf/les-petits-gestes-au-quotidien.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4736, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ À l’intérieur des véhicules, le faible volume d’air dans l’habitacle
conduit à une concentration des polluants venant de l’extérieur et de ceux
émis dans l’habitacle du véhicule.

💡Éviter d''aérer votre véhicule en zone de trafic dense lors des épisodes de
pollution.', false, true, false, false, 'En voiture, aérer régulièrement son véhicule pour réduire la concentration de
polluants à l’intérieur.', 'DGS', 'hidden', false, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4737, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les salariés qui viennent au travail à vélo peuvent demander une indemnité
kilométrique pouvant atteindre 200 euros par an et par cycliste.

💡Depuis 2018, les entreprise de plus de 100 salariés ont pour obligation de
mettre en place un [Plan de mobilité](https://www.ademe.fr/entreprises-monde-
agricole/reduire-impacts/optimiser-mobilite-salaries/dossier/plan-
mobilite/plan-mobilite-quest-cest).', false, true, false, false, 'Si possible, privilégier le vélo pour se rendre au travail.', 'Ademe : https://multimedia.ademe.fr/infographies/infographie-la-mobilite-ademe/', 'hidden', false, 'indice_atmo', true, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4876, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Eviter de s''allonger directement sur le sable : utiliser une serviette de bain ou un matelas.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4860, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Pas de protection requise. ', '', 'published', false, 'indice_uv', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4861, false, false, 1, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Pas de protection requise. ', '', 'published', false, 'indice_uv', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, true, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4604, true, false, 0, 1, NULL, false, false, false, '{}', 'ℹ️ Un air trop humide ou trop sec provoque une sensation d’inconfort (sensation de froid ou sensation de sécheresse dans les voies respiratoires…).

💡Pour se sentir bien, le taux d’humidité doit être compris entre 35 et 60 %', false, true, NULL, false, 'Même si le temps est idéal pour faire sécher le linge en extérieur, il est conseillé de le faire sécher en intérieur. Le pollen se dépose et se fixe sur les surfaces humides.', 'ADEME / https://particuliers.ademe.fr/maison/menage/comment-assainir-lair-partout-dans-la-maison
  Guide de la pollution de l''air intérieur de l''Inpes', 'published', false, 'pollens', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4862, false, false, 3, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Entre midi et 16h00, rechercher l’ombre. 
- Porter des vêtements à manches longues, un chapeau à larges bords, et des lunettes de soleil.
- Appliquer une crème de protection solaire au minimum d’indice SPF 30+ sur les zones découvertes.
- Éviter d’exposer au soleil les enfants de moins de 10 ans, en particulier de 1 à 3 ans. Protéger les enfants de moins de 1 an de toute exposition. En cas de sortie, respecter les mêmes consignes de protection de la peau (couvrir au maximum et appliquer une crème de protection solaire).', '', 'published', false, 'indice_uv', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4863, false, false, 6, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Entre midi et 16h00, rechercher l’ombre. 
- Porter des vêtements à manches longues, un chapeau à larges bords, et des lunettes de soleil.
- Appliquer une crème de protection solaire au minimum d’indice SPF 30+ sur les zones découvertes.
- Éviter d’exposer au soleil les enfants de moins de 10 ans, en particulier de 1 à 3 ans. Protéger les enfants de moins de 1 an de toute exposition. En cas de sortie, respecter les mêmes consignes de protection de la peau (couvrir au maximum et appliquer une crème de protection solaire).', '', 'published', false, 'indice_uv', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4864, false, false, 8, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Éviter de s’exposer au soleil entre midi et 16h00.
- Porter des vêtements à manches longues, un chapeau à larges bords, et des lunettes de soleil.
- Appliquer une crème de protection solaire d’indice SPF 50 et + sur les zones découvertes.
- Éviter d’exposer au soleil les enfants de moins de 10 ans, en particulier de 1 à 3 ans. Protéger les enfants de moins de 1 an de toute exposition. En cas de sortie, respecter les mêmes consignes de protection de la peau (couvrir au maximum et appliquer une crème de protection solaire).', '', 'published', false, 'indice_uv', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4865, false, false, 11, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, '- Exclure toute exposition au soleil entre midi et 16h00.
- Appliquer une crème de protection solaire d’indice SPF 50 et + sur les zones découvertes.
- Éviter d’exposer au soleil les enfants de moins de 10 ans, en particulier de 1 à 3 ans. Protéger les enfants de moins de 1 an de toute exposition. En cas de sortie, respecter les mêmes consignes de protection de la peau (couvrir au maximum et appliquer une crème de protection solaire).', '', 'published', false, 'indice_uv', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, '', '{}', false, false, false, false, false, false, 4764, false, false, 0, 4, NULL, false, false, false, '{}', 'ℹ️ Les activités physiques intenses entraînent une surventilation et donc une augmentation de la quantité de pollens inhalée.

💡Il est conseillé de faire du sport tôt le matin ou tard le soir, lorsque les concentrations sont moins fortes, surtout lorsqu’il a plu, car les pollens sont à terre.', false, false, NULL, false, 'Éviter les efforts physiques intenses (obligeant à respirer avec la bouche) en plein air ou bien les réaliser à l''intérieur pendant les pics polliniques.', 'ATMO : Nouvelle aquitaine
https://www.atmo-nouvelleaquitaine.org/article/les-pollens

Article le monde : https://www.lemonde.fr/sciences/article/2018/04/30/sportifs-attention-aux-pics-polliniques_5292482_1650684.html
allergologue Pierrick Hordé ', 'published', false, 'pollens', true, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4884, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Ne pas laisser boire ou se baigner les animaux domestiques (chiens) dans des sites où l’eau est colorée, stagnante ou en présence de mousse en surface.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, true, false, 4799, false, false, 0, 4, NULL, false, false, true, '{}', 'ℹ️ La chaleur et l’ensoleillement peuvent aggraver les concentrations en
polluants dans l’air.

💡Il est important de s’hydrater régulièrement pendant l’activité, sans
attendre d’avoir soif.', true, false, NULL, true, 'En cas de pic de pollution, de pollens ou de fortes chaleurs, il est conseillé d’éviter les activités physiques intenses en plein air.', '​​https://www.ameli.fr/paris/assure/sante/themes/asthme-vivre-maladie/asthme-activite-physique', 'published', false, 'pollens', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, '', '{}', false, false, false, false, false, false, 4755, false, false, 0, 4, NULL, false, false, false, '{}', 'ℹ️ L''air intérieur que nous respirons 80 % de notre temps (chez nous, au travail, dans les transports en commun...) est 5 fois plus pollué que l''air extérieur.

💡 En plus de l''air extérieur qui y pénètre s''ajoutent des polluants spécifiques de l’air intérieur (polluants chimiques, fibres, particules...).

[Pour en savoir plus sur l''air de votre
logement.](https://www.ademe.fr/sites/default/files/assets/documents/guide-
pratique-un-air-sain-chez-soi.pdf)', false, false, NULL, false, 'En période de pics polliniques, éviter l’exposition aux autres substances irritantes ou allergisantes en air intérieur (tabac, produits d’entretien, parfums d’intérieur, encens, etc.).', 'MSS
Conseil de la santé publique (HCSP) 
avis publié le 28 avril 2016', 'published', false, 'pollens', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, true, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4620, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les Composés Organiques Volatils (COV) sont des substances chimiques qui s''évaporent plus ou moins rapidement dans l''air à la température ambiante, entraînant ainsi des impacts directs et indirects sur l’homme, les animaux et la nature. 

💡Les COV sont contenus dans de nombreux produits et matériaux tels les désodorisants, les laques, les vernis, les peintures, les colles, les parquets, les solvants, les cires, les produits nettoyants, etc.
Attention : il faut toujours aérer la pièce lors de travaux, même lors de l''utilisation de produits A+.', false, true, NULL, false, 'Lors de travaux, avant tout achat de matériaux, penser à prendre le temps de
consulter l’étiquette “Emissions dans l’air intérieur” qui signale de façon
simple et lisible le niveau d’émission en polluants COV. Le niveau d’émission
y est décrit sur une échelle allant de A+ (faible) à C (forte).', 'Air breizh, https://www.airbreizh.asso.fr/les-bonnes-pratiques/', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4560, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ L''air intérieur que nous respirons 80 % de notre temps (chez nous, au travail, dans les transports en commun...) est jusqu''à 7 fois plus pollué que l''air extérieur.  
💡 En plus de l''air extérieur qui y pénètre s''ajoutent des polluants spécifiques de l’air intérieur (polluants chimiques, fibres, particules...). Une exposition répétée et durable, même à des doses parfois très faibles, peut aggraver ou être à l’origine de pathologies chroniques. Les populations vulnérables (enfants, femmes enceintes, personnes vivants avec une pathologie respiratoire ou cardiaque) doivent ête encore plus vigilantes sur la bonne aération des logements.', false, true, false, false, 'Aérer au moins 10 minutes deux fois par jour en ouvrant les fenêtres pour
créer un courant d''air dans la pièce.', '  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_generale.pdf ', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4874, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, true, false, 'Un événement particulier affectant l''air est en cours dans votre commune, renseignez-vous auprès de <a href="{aasqa_website}">{aasqa_nom}</a>.', '', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4590, true, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Il est conseillé de les apporter en déchèterie ou de les recycler dans
votre jardin sous forme de compost.

💡La combustion de biomasse (feux de cheminée, feux agricoles et feux de
jardins) est responsable de 50 à 70 % de la pollution carbone hivernale en
Europe.[Plus d’informations](https://huit.re/feux-vegetation)', false, true, false, false, 'Il est interdit de brûler ses déchets verts en extérieur.', 'ATMO', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, false, false, false, 4563, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Éviter de sortir durant les heures de pointes (début de matinée ou en fin
de journée) et aux abords des grands axes routiers.

💡L’exposition à court terme (pic de pollution) mais surtout l’exposition sur
le long terme (chronique) à la pollution de l’air a des impacts importants sur
la santé, en particulier pour les personnes vulnérables ou sensibles.', false, true, false, true, 'En cas de gêne respiratoire ou cardiaque, prendre conseil auprès d''un
professionnel de santé.', 'https://www.airparif.asso.fr/_pdf/avis-hcsp20131115_messagesanitairesepisopollution.pdf', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, false, false, false, 4581, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ En agglomération, 40 % des trajets effectués en voiture font moins de trois
kilomètres. Pour calculer l''impact de vos déplacements sur le climat, essayez
le simulateur [Mon impact transport](https://monimpacttransport.fr/).', false, false, false, true, 'Privilégier les transports en commun et les mobilités actives (marche à pied, vélo…) plutôt que la voiture afin de limiter les émissions de polluants dans l''air.', 'ATMO', 'published', true, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, false, false, false, 4582, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️Dans une étude réalisée en 2015, l’observatoire régional de surveillance de
la qualité de l’air en Occitanie a démontré que les piétons étaient moins
exposés à la pollution de l''air que les automobilistes.

💡Vous réduirez ainsi l''impact de vos déplacements sur l''environnement !', false, false, false, true, 'En cas de mauvaise qualité de l''air, privilégier la marche pour les
déplacements.', 'https://www.atmo-auvergnerhonealpes.fr/article/activites-physiques-et-qualite-de-lair-bien-respirer-pour-bien-bouger', 'published', true, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4873, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Ne pas emmener d’animaux domestiques sur la plage, les plages sont souvent interdites aux animaux pendant la saison balnéaire.', '', 'deleted', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4867, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Éviter la baignade dans les 2 heures qui suivent un repas copieux ou une consommation d’alcool.', '', 'deleted', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4872, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, 'La plage est un espace public, gardez-la propre en utilisant les poubelles pour les déchets et les installations sanitaires mises à votre disposition.', '', 'deleted', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4869, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, NULL, false, 'Dans l’eau, prendre garde aux vives, méduses, raies et autres animaux venimeux.', '', 'deleted', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4868, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Se renseigner sur la présence de vives, méduses, raies et autres animaux venimeux. En cas d''accident, se rendre au poste de secours ou consulter un médecin.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, false, false, false, 4619, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Le transport routier (voitures, deux roues, poids lourds...) émet du
monoxyde de carbone, de l''oxyde d''azote et des particules fines. Ces polluants
ont des effets négatifs sur la santé.

💡 Les niveaux de pollution varient tout au long de la journée. Les niveaux les
plus importants pour le dioxyde d’azote sont pendant les heures de pointes du
matin et du soir.', false, true, false, true, 'À pied, préférer les voies piétonnes ou les rues moins encombrées par le
trafic.', 'https://www.airparif.asso.fr/_pdf/les-petits-gestes-au-quotidien.pdf', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, false, false, false, 4653, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Pour réaliser un diagnostic de la qualité de son air intérieur, utiliser
l''outil gratuit ["Un bon air chez moi"](https://huit.re/unbonair ) développé
par le Ministère de la Transition Ecologique et Solidaire.

💡Vous pouvez répondre en 5 minutes au premier quizz sur le thème "Aération,
humidité et chauffage".', false, false, false, true, 'Ne pas aggraver les effets de la pollution en ajoutant des facteurs irritants
: fumée de tabac, utilisation de solvants en espace intérieur, chauffage au
bois, exposition aux pollens en saison, etc.', 'Avis de l''HCSP (15/11/2013)', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, false, true, false, 4659, true, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les barbecues au charbon de bois émettent un mélange de substances
polluantes pour l’air et pouvant occasionner des effets sur la santé. Leur
utilisation doit se faire impérativement dans un lieu bien aéré et ventilé.

💡 Pour les consommateurs qui font un usage fréquent du barbecue à charbon de
bois, privilégier l’usage de charbon de bois épuré (> 85% de carbone ou de
catégorie A) plutôt que de charbon de bois ordinaire.

Pour en savoir plus sur la cuisson au barbecue : https://huit.re/barbecue-air', true, false, false, true, 'En cas de mauvaise qualité de l''air, reporter l''utilisation d''un barbecue à
combustible solide (bois, charbon, etc.).', 'https://www.atmo-auvergnerhonealpes.fr/sites/ra/files/atoms/files/campagne_air_et_sante_-_messages_2017.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4711, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ L’efficacité d’un masque dépend de sa conception, des performances du
filtre dont il est équipé, ou encore l''adaptation à la morphologie de
l’utilisateur. Ainsi, si l’efficacité d’un masque testé en laboratoire peut
s’avérer élevée, elle ne reflète pas pour autant l’efficacité en conditions
réelles d’utilisation.

💡Par ailleurs, la plupart des masques anti-pollution sont conçus pour protéger
des particules présentes dans l’air ambiant et ne protègent pas contre les
substances présentes à l’état gazeux (comme le dioxyde d’azote, polluant
majoritairement émis par le trafic routier dont les concentrations en ville
sont élevées).', false, false, false, true, 'En ville, l''utilisation de masque anti-pollution ne réduit pas l''impact de la
pollution de l''air sur la santé.', 'https://www.atmo-auvergnerhonealpes.fr/article/activites-physiques-et-qualite-de-lair-bien-respirer-pour-bien-bouger
https://www.atmo-auvergnerhonealpes.fr/actualite/incollable-sur-la-qualite-de-lair-les-masques-sont-ils-efficaces-contre-la-pollution-de', 'published', false, 'indice_atmo', true, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, false, true, false, false, false, 'Air intérieur', '{"bois"}', false, false, false, false, false, true, 4771, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️Un bois de mauvaise qualité brûle moins bien et peut potentiellement dégager
des substances chimiques dans l''air.

💡Les labels recommandés sont notamment : NF Bois de Chauffage, France bois
bûches, Din+, EN plus… Les combustibles bois porteurs de mentions PEFC et FSC
proviennent de forêts gérées durablement.', false, true, false, false, 'Pour le chauffage au bois, privilégier l''achat de bûches, plaquettes ou
granulés porteurs de labels ou de marques de qualité.', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, false, true, false, false, false, 'Air intérieur', '{"bois"}', false, false, false, false, false, true, 4773, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Il est conseillé d''entreposer les bûches coupées sur des palettes ou des
tasseaux, sous un abri couvert et bien ventilé ou une bâche respirante.', false, true, false, false, 'Pour le chauffage au bois, faire sécher les bûches trop humides pendant 18
mois dans un lieu bien ventilé.', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, false, true, false, false, false, 'Air intérieur', '{"bois"}', false, false, false, false, false, true, 4777, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Le tirage est l’aspiration créée dans le conduit de cheminée. S''il est
insuffisant, la combustion est de médiocre qualité, donc votre installation
pollue davantage et son rendement diminue. Pour les poêles à bûches, ouvrir
les clés de tirage.

💡Vérifier aussi que le conduit de fumée est étanche et n’est pas encrassé ou
obstrué.', false, true, false, false, 'Si le bois brûle mal dans votre appareil de chauffage et qu''une épaisse fumée se dégage, aérer immédiatement la pièce puis vérifier que le tirage de votre appareil est bien réglé et que le conduit n''est pas obstrué.', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4700, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Le perchloréthylène (également appelé tétrachloroéthylène, PER ou perchlo)
est un solvant très volatile utilisé dans les pressings, notamment pour le
nettoyage à sec des vêtements. Ce produit est nocif pour l''environnement et
l''homme, il irrite les voies respiratoires.', false, true, false, false, 'Aérer les vêtements après un nettoyage à sec au pressing.', 'OQAI, "les bons gestes pour un bon air".', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, true, NULL, false, false, 4662, false, false, 0, 0, NULL, false, false, false, '{}', '💡Dans une étude réalisée en 2015, l’observatoire régional de surveillance de
la qualité de l’air en Occitanie démontré que le choix d''emprunter un axe avec
peu de trafic routier a permis de réduire l''exposition moyenne du cycliste ou
du piéton d’environ 40 % pour le dioxyde d''azote (NO2) et de 50 % pour les
particules PM10.', false, false, false, true, 'Avec un enfant, lors des déplacements aux heures de pointe, privilégier les sorties loin des grands axes routiers.', 'https://www.atmo-auvergnerhonealpes.fr/sites/ra/files/atoms/files/campagne_air_et_sante_-_messages_2017.pdf', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4664, false, false, 0, 0, NULL, false, false, false, '{}', '💡Dans une étude réalisée en 2015, l’observatoire régional de surveillance de
la qualité de l’air en Occitanie a démontré que le choix d''emprunter un axe
avec peu de trafic routier a permis de réduire l''exposition moyenne du
cycliste ou du piéton d’environ 40 % pour le dioxyde d''azote (NO2) et de 50 %
pour les particules PM10.', false, true, false, true, 'En vélo, éviter les gaz d''échappement : il est conseillé de se placer devant
les voitures au feu rouge et de garder ses distances lorsque l''on suit un
véhicule motorisé.', 'https://www.atmo-auvergnerhonealpes.fr/article/activites-physiques-et-qualite-de-lair-bien-respirer-pour-bien-bouger', 'published', false, 'indice_atmo', true, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4666, false, false, 0, 0, NULL, false, false, false, '{}', '💡 Selon l’Observatoire Régional de Santé d’Ile de France, le choix de
l’itinéraire lors d’un trajet à vélo permet de jouer sur deux aspects (temps
de trajet et densité de trafic de l’axe parcouru) qui influencent fortement
l’exposition à la pollution de l’air. Ainsi, des itinéraires fluides pour les
cyclistes et à l’écart des grands axes de circulation peuvent diminuer le
niveau d’exposition aux polluants.', false, true, false, true, 'À vélo, choisir dès que possible un itinéraire évitant les grands axes
routiers.', '"Observatoire Régional de la Santé d''IDF

https://www.ors-idf.org/nos-travaux/publications/les-benefices-et-les-risques-de-la-pratique-du-velo.html"', 'published', false, 'indice_atmo', true, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, true, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4781, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️Les concentrations de polluants observées dans l’air en France y compris
pendant les épisodes de pollution, ne remettent pas en cause les bénéfices de
la pratique régulière d’activité physique, à l’extérieur comme à l’intérieur
des bâtiments.

💡Cependant, étant donné que l’on peut inhaler un plus grand volume d’air lors
de la pratique d’une activité physique (selon l’intensité de l’activité
pratiquée, de l’état de santé de la personne…), et donc potentiellement une
plus grande quantité de polluants , il est préférable de pratiquer les
activités physiques le plus possible à l’écart des sources majeures de
pollution.', false, false, false, true, 'Même en cas de mauvaise qualité de l''air, il est possible de pratiquer une activité physique en extérieur en limitant son intensité, et en restant loin des sources majeures de pollution.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/air-exterieur/qualite-de-l-air-exterieur-10984/article/recommandations-en-cas-d-episode-de-pollution#:~:text=%C3%A9vitez%20les%20activit%C3%A9s%20physiques%20et,l''int%C3%A9rieur%20peuvent%20%C3%AAtre%20maintenues.&text=professionnel%20de%20sant%C3%A9.%20%3B-,privil%C3%A9giez%20des%20sorties%20plus%20br%C3%A8ves%20et,demandent%20le%20moins%20d''effort.', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4796, false, false, 0, 0, NULL, false, false, true, '{}', 'ℹ️ Réduire l’intensité de sa pratique sportive permet d’éviter la survenue de
crise d’asthme.

💡 Lors de la pratique d’une activité physique, la respiration s’accélère et se
fait par la bouche pour apporter plus d’oxygène aux muscles. Cela entraine
l’arrivée d’un air froid et sec directement au niveau des bronches, qui
provoque leur contraction. De plus, la respiration par la bouche ne permet pas
de filtrer certains facteurs allergiques (les pollens) ou irritants (pollution
atmosphérique) qui atteignent directement les bronches et favorisent la
survenue d’une crise d’asthme.', false, false, false, true, 'Privilégier des activités physiques modérées demandant moins d’effort en cas
de mauvaise qualité de l’air.', '​​https://www.ameli.fr/paris/assure/sante/themes/asthme-vivre-maladie/asthme-activite-physique
', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, true, NULL, false, false, 4743, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Un [projet d''accueil individualisé](https://www.service-
public.fr/particuliers/vosdroits/F21392) est un document écrit qui permet de
préciser les adaptations à apporter à la vie de l''enfant ou de l''adolescent en
collectivité (crèche, école, collège, lycée, centre de loisirs). Il est
élaboré à la demande de la famille et/ou du chef d''établissement avec l''accord
de la famille.', false, true, false, true, 'Si votre enfant souffre d''une pathologie chronique pouvant être aggravée par
la pollution de l''air (allergies, asthme), il/elle peut bénéficier d''un projet
d''accueil individualisé en collectivité (crèche, école, collège, lycée, centre
de vacances...).', 'https://www.service-public.fr/particuliers/vosdroits/F21392', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, false, false, true, false, false, 'Air extérieur', '{}', false, false, false, false, false, false, 4778, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️La pratique d’activité physique d’intensité modérée (comme un déplacement à
vélo en pédalant tranquillement et en évitant de trop forts dénivelés par
exemple) est possible en cas d’épisode de pollution.

💡Cependant, il est recommandé d''éviter les sources majeures de pollution,
telles que les grands axes routiers, et les heures de pointes (entre 7h-10h et
17h-20h).', false, false, false, true, 'En cas de mauvaise qualité de l''air, privilégier des trajets courts et moins
intenses pour les déplacement en vélo.', 'https://www.atmo-auvergnerhonealpes.fr/article/activites-physiques-et-qualite-de-lair-bien-respirer-pour-bien-bouger
http://beh.santepubliquefrance.fr/beh/2015/30-31/pdf/2015_30-31_4.pdf', 'published', false, 'indice_atmo', true, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, true, NULL, false, false, 4782, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️Les activités sportive d''intensité élevée comme les course à pied et les
sports de compétition doivent être limités en intérieur comme en extérieur.
Des activités plus modérées peuvent être maintenue comme la marche, le vélo ou
encore la danse.', false, false, false, true, 'En cas de mauvaise qualité de l''air, il est conseillé de maintenir les
activités sportives de son enfant en limitant leur intensité.', 'https://solidarites-sante.gouv.fr/sante-et-environnement/air-exterieur/qualite-de-l-air-exterieur-10984/article/recommandations-en-cas-d-episode-de-pollution#:~:text=%C3%A9vitez%20les%20activit%C3%A9s%20physiques%20et,l''int%C3%A9rieur%20peuvent%20%C3%AAtre%20maintenues.&text=professionnel%20de%20sant%C3%A9.%20%3B-,privil%C3%A9giez%20des%20sorties%20plus%20br%C3%A8ves%20et,demandent%20le%20moins%20d''effort.', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4821, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, true, 'En cas de gêne respiratoire ou cardiaque, prendre conseil auprès d''un
professionnel de santé.', 'Infographies MSS : 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_generale.pdf 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_enfants.pdf
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_age.pdf', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4825, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, true, 'En cas de mauvaise qualité de l''air, privilégier des trajets courts et moins
intenses pour les déplacement en vélo.', 'https://www.atmo-auvergnerhonealpes.fr/article/activites-physiques-et-qualite-de-lair-bien-respirer-pour-bien-bouger
http://beh.santepubliquefrance.fr/beh/2015/30-31/pdf/2015_30-31_4.pdf', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, true, false, false, false, 'Air extérieur', '{"bois"}', false, false, false, false, false, true, 4580, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ La combustion du bois produit beaucoup de polluants, comme des particules
fines, qui contribuent à dégrader la qualité de l’air extérieur. Les émissions
sont majoritairement issues des appareils non performants (foyers fermés et
poêles anciens ou foyers ouverts) du parc domestique.

💡Le label Flamme verte garantit des appareils de chauffage au bois répondant
aux normes de performance énergétique et de limitation des émissions
polluantes.', false, true, false, false, 'Privilégier un appareil performant labellisé (exemple : label Flamme verte)
pour le chauffage au bois.', 'ATMO : https://www.atmo-nouvelleaquitaine.org/article/comment-se-chauffer-au-bois-sans-polluer

Ademe : https://www.ademe.fr/expertises/energies-renouvelables-enr-production-reseaux-stockage/passer-a-laction/produire-chaleur/dossier/bois-biomasse/bois-energie-qualite-lair', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, true, false, false, false, 'Air intérieur', '{"bois"}', false, false, false, NULL, false, true, 4713, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Le bois humide fournit moins d’énergie qu’un bois sec, libère plus de
substances polluantes dangereuses pour la santé, et encrasse votre appareil de
chauffage.

💡Choisir des bûches qui ne présentent pas de moisissures, dont l''écorce se
détache facilement, qui sont légères et dont les flammes sont bleues
lorsqu''elles brûlent.', false, true, false, false, 'Utiliser du bois sec plutôt que du bois humide pour se chauffer.', 'https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, true, false, 4731, true, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Cette technique permet d''éviter la repousse des herbes indésirables,
d’utiliser de grandes quantités de déchets verts (feuilles mortes, fleurs
fanées, tontes de pelouse sèche), de retenir l’eau et de protéger le sol et sa
micro-faune.

💡Depuis janvier 2019, la vente des pesticides chimiques est interdite.', false, true, false, false, 'Pour lutter contre les herbes indésirables, il est conseillé de recouvrir le
sol de déchets verts plutôt que d''utiliser des pesticides.', 'Ademe', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4579, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ 10 km/h en moins permettent d’économiser jusqu’à 5 litres de carburant et
de réduire de 12,5 % (soit 12 kg) les émissions de CO2 sur 500 km. [Plus
d''informations](https://huit.re/voiture-eco).', false, true, false, false, 'Sur la route, adopter une conduite souple, sans à-coups, en respectant les
limitations de vitesse.', 'ATMO
 https://www.airparif.asso.fr/_pdf/les-petits-gestes-au-quotidien.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, true, false, false, false, 'Air intérieur', '{"bois"}', false, false, false, NULL, false, true, 4677, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Sans ramonage régulier, le conduit de fumée d’un appareil de chauffage au
bois s’encrasse et peut même se boucher, augmentant le risque d''intoxications
au monoxyde de carbone. Le monoxyde de carbone est un gaz inodore et invisible
dangereux pour la santé. Éviter l’utilisation de bûches de ramonage, elles
n’ont pas prouvé leur efficacité.

💡Le ramonage régulier du conduit de cheminée permet aussi de réduire le
dégagement de substances polluantes dans l''air extérieur.', false, true, false, false, 'Réaliser un ramonage mécanique du conduit de fumée de sa cheminée ou de son poêle par un professionnel qualifié pour éviter les intoxications au monoxyde de carbone et les incendies.', 'OQAI, "les bons gestes pour un bon air".
Ademe : https://www.ademe.fr/sites/default/files/assets/documents/guide-pratique-chauffage-au-bois-mode-emploi.pdf', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4732, true, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les pesticides contiennent des substances toxiques pour la santé et
l''environnement.

💡Utiliser, par exemple, l''eau de cuisson.', false, true, false, false, 'Pour lutter contre les herbes indésirables sur les terrasses ou dans les
allées du jardin, utiliser de l''eau bouillante plutôt que des produits
chimiques.', 'Ademe', 'hidden', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4716, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Lorsque l''indice de qualité de l''air est bon et moyen, vous pouvez
pratiquer vos activités physiques habituelles en extérieur.

💡En France, la recommandation diffusée par le ministère de la santé est de
pratiquer l’équivalent d’au moins 30 minutes de marche rapide par jour au
minimum 5 fois par semaine pour les adultes et l’équivalent d’au moins 60
minutes par jour pour les enfants et adolescents.', false, true, false, false, 'Faire une activité physique (marche, vélo, activité physique adaptée...) en
extérieur.', '"MSS 
https://solidarites-sante.gouv.fr/prevention-en-sante/preserver-sa-sante/article/activite-physique-et-sante"', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (true, NULL, false, false, NULL, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4783, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Pratiquer du sport à l''intérieur ne signifie pas que la qualité de l''air y
sera meilleure. Une salle de sport mal ventilée peut aussi rencontrer des
problèmes de pollution.

💡Selon le décret 2015-1000, avant 2023 tous les établissements d’activités
physiques et sportives couverts devront faire l''objet d''une surveillance de la
qualité de l''air intérieur.', false, true, false, false, 'En cas d''activité physique intérieur en salle de sport, s''assurer de la bonne
ventilation des locaux.', 'https://www.atmo-auvergnerhonealpes.fr/article/activites-physiques-et-qualite-de-lair-bien-respirer-pour-bien-bouger', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, false, false, 'Air extérieur', '{}', false, false, false, false, false, false, 4572, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Les période de pointe sont entre 7h-10h et 17h-20h.

💡 Dans une étude réalisée en 2015, l’observatoire régional de surveillance de
la qualité de l’air en Occitanie a démontré que le choix d''emprunter un axe
avec peu de trafic routier permet de réduire l''exposition moyenne du cycliste
ou du piéton d’environ 40 % pour le dioxyde d''azote et de 50 % pour les
particules PM10. [Plus d’informations](https://huit.re/diminution-pollution-
velo)', false, true, false, true, 'Durant les heures de pointe, privilégier les sorties à proximité de zones à faible trafic routier.', 'Arrêté du 13 mars 2018 modifiant l’arrêté du 20 août 2014 relatif aux recommandations sanitaires en vue de prévenir les effets de la pollution de l’air sur la santé, pris en application de l’article R. 221-4 du code de l’environnement', 'published', true, 'indice_atmo', true, '{}', '{}', true);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, 'Air intérieur', '{}', false, false, false, NULL, false, false, 4789, false, false, 0, 0, NULL, false, false, false, '{}', 'ℹ️ Il est important de toujours aérer son logement, même en cas de qualité de l''air mauvaise. 💡 En plus de l''air extérieur qui y pénètre s''ajoutent des polluants spécifiques de l’air intérieur (polluants chimiques, fibres, particules...). Une exposition répétée et durable, même à des doses parfois très faibles, peut aggraver ou être à l’origine de pathologies chroniques ou de maladies graves.', false, true, false, false, 'Aérer au moins 10 minutes deux fois par jour en ouvrant les fenêtres pour créer un courant d''air dans la pièce.', 'Infographies MSS : 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_generale.pdf 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_enfants.pdf
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_age.pdf', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, 'Air extérieur', '{}', false, false, false, NULL, false, false, 4818, false, false, 0, 0, NULL, false, false, false, '{}', '', false, true, false, false, 'Privilégier la mobilité active (vélo, marche) lors des déplacements afin de réduire votre impact sur l''environnement.', 'Infographies MSS : 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_generale.pdf 
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_enfants.pdf
  https://solidarites-sante.gouv.fr/IMG/pdf/pollution_age.pdf', 'published', false, 'indice_atmo', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4875, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Eviter de se baigner en cas de diarrhée ou de nausées, d’une infection contagieuse de la peau ou de plaies ouvertes.', 'Ministère de la Santé et de la Prévention et SpF', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4877, false, false, 0, 0, NULL, false, false, false, '{}', '', false, false, false, false, 'Après la baignade, se rincer à l''eau claire.', '', 'published', false, 'baignades', false, '{}', '{}', false);
insert into "recommandation" ("activite_physique", "animal_de_compagnie", "automne", "autres", "balcon_terasse", "bricolage", "categorie", "chauffage", "dioxyde_azote", "dioxyde_soufre", "enfants", "episode_pollution", "ete", "hiver", "id", "jardinage", "menage", "min_indice_uv", "min_raep", "ordre", "ozone", "particules_fines", "personnes_sensibles", "potentiel_radon", "precisions", "printemps", "qa_bonne", "qa_evenement", "qa_mauvaise", "recommandation", "sources", "status", "transport_en_commun", "type", "velo_trott_skate", "vigilance_couleur_ids", "vigilance_phenomene_ids", "voiture") values (false, NULL, false, false, NULL, false, '', '{}', false, false, false, NULL, false, false, 4793, false, false, 0, 0, NULL, true, false, false, '{}', '', false, false, false, false, '* En cas de gêne respiratoire ou cardiaque, prendre conseil auprès d’un professionnel de santé.
  * Privilégier des sorties plus brèves et celles qui demandent le moins d’effort.
  * Maintenir les activités physiques et sportives intenses (dont les compétitions) à l’intérieur.

Si vous êtes une personne sensible ou vulnérable :

  * prendre conseil auprès de votre médecin pour savoir si votre traitement médical doit être adapté le cas échéant ; 
  * éviter les sorties durant l’après-midi lorsque l’ensoleillement est maximum ;
  * éviter les activités physiques et sportives intenses (dont les compétitions) en plein air ; celles peu intenses à l’intérieur peuvent être maintenues.', '', 'published', false, 'episode_pollution', false, '{}', '{}', false);
