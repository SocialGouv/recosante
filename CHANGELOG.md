## [1.10.14](https://github.com/SocialGouv/recosante/compare/v1.10.13...v1.10.14) (2023-10-04)


### Bug Fixes

* periode validite simpler ([#254](https://github.com/SocialGouv/recosante/issues/254)) ([532d61f](https://github.com/SocialGouv/recosante/commit/532d61f815ed9368f02636bde5bde615264f4c49))

## [1.10.13](https://github.com/SocialGouv/recosante/compare/v1.10.12...v1.10.13) (2023-10-03)


### Bug Fixes

* remove duplicate logging of exception ([568491d](https://github.com/SocialGouv/recosante/commit/568491d458e1ae0dce5ae4b7cb918b6fc7b8b001))
* remove updated_at from tncc ([#253](https://github.com/SocialGouv/recosante/issues/253)) ([273652e](https://github.com/SocialGouv/recosante/commit/273652e0e982f5b495516a37dbbb52c726eafc95))

## [1.10.12](https://github.com/SocialGouv/recosante/compare/v1.10.11...v1.10.12) (2023-10-02)


### Bug Fixes

* lint saveall ([#247](https://github.com/SocialGouv/recosante/issues/247)) ([230044b](https://github.com/SocialGouv/recosante/commit/230044b9017eff445447c6eec8b0643f70fcaad3))

## [1.10.11](https://github.com/SocialGouv/recosante/compare/v1.10.10...v1.10.11) (2023-09-29)


### Bug Fixes

* **indice:** fix vigilance meteo index error ([3b99b3e](https://github.com/SocialGouv/recosante/commit/3b99b3e818792bdf6d9d93ca48058d467d4be07e))
* **indice:** improve exception logging in celery tasks ([b63cb2a](https://github.com/SocialGouv/recosante/commit/b63cb2adddaa233b64cd7ba87ef1c463224adb39))

## [1.10.10](https://github.com/SocialGouv/recosante/compare/v1.10.9...v1.10.10) (2023-09-29)


### Bug Fixes

* newsletter token available 30d ([#236](https://github.com/SocialGouv/recosante/issues/236)) ([c47b69e](https://github.com/SocialGouv/recosante/commit/c47b69e21e5bf76e98b5f6b684799dd261f785f0))

## [1.10.9](https://github.com/SocialGouv/recosante/compare/v1.10.8...v1.10.9) (2023-09-26)


### Bug Fixes

* use cnpg in prod ([37f33a2](https://github.com/SocialGouv/recosante/commit/37f33a23649223e536913f9adc0068001438073c))

## [1.10.8](https://github.com/SocialGouv/recosante/compare/v1.10.7...v1.10.8) (2023-09-26)


### Bug Fixes

* **cnpg:** try 3GB pg memory ([ec0d30a](https://github.com/SocialGouv/recosante/commit/ec0d30ae1b4a0ddfdcacefa4ce91b5a4a28f9c2c))

## [1.10.7](https://github.com/SocialGouv/recosante/compare/v1.10.6...v1.10.7) (2023-09-26)


### Bug Fixes

* **cnpg:** limit pg RAM ([0b8e95b](https://github.com/SocialGouv/recosante/commit/0b8e95b196f2ed42b2703a44015c38f5cb16cc76))

## [1.10.6](https://github.com/SocialGouv/recosante/compare/v1.10.5...v1.10.6) (2023-09-26)


### Bug Fixes

* back to buildkit service ([e4f2d55](https://github.com/SocialGouv/recosante/commit/e4f2d55e8b720c04d2daf4808d035e860e0fc6d9))

## [1.10.5](https://github.com/SocialGouv/recosante/compare/v1.10.4...v1.10.5) (2023-09-25)


### Bug Fixes

* **build:** disable builtkit for now ([e7c014b](https://github.com/SocialGouv/recosante/commit/e7c014b64efc0bb2b3c084230d687849ea0b53bd))
* **cnpg:** reduce cnpg request ([9d20a05](https://github.com/SocialGouv/recosante/commit/9d20a0564183bc1a8e9561ac85620a50770d1ba2))

## [1.10.4](https://github.com/SocialGouv/recosante/compare/v1.10.3...v1.10.4) (2023-09-25)


### Bug Fixes

* **k8s:** buildkit service in prod ([15371cb](https://github.com/SocialGouv/recosante/commit/15371cb60e5c860929718b1f2ad2607cc5fcabd2))

## [1.10.3](https://github.com/SocialGouv/recosante/compare/v1.10.2...v1.10.3) (2023-09-25)


### Bug Fixes

* **cnpg:** default work_mem, increase memory req/limits ([#232](https://github.com/SocialGouv/recosante/issues/232)) ([bf02b7b](https://github.com/SocialGouv/recosante/commit/bf02b7ba1970f3efdbd586db0a658808154ec7a8))

## [1.10.2](https://github.com/SocialGouv/recosante/compare/v1.10.1...v1.10.2) (2023-09-22)


### Bug Fixes

* increase cnpg prod volume size ([a9ba0d7](https://github.com/SocialGouv/recosante/commit/a9ba0d7f3bb7e7af1f0a459045d6f74be382ca9f))


### Reverts

* Revert "feat: `created_at` and `update_at` in every indice table (#227)" ([50dffb9](https://github.com/SocialGouv/recosante/commit/50dffb9bdf86c36cbc9c58c518d96953cc36c4df)), closes [#227](https://github.com/SocialGouv/recosante/issues/227)

## [1.10.1](https://github.com/SocialGouv/recosante/compare/v1.10.0...v1.10.1) (2023-09-22)


### Bug Fixes

* try increase indice startup probe for long migrations ([4f53333](https://github.com/SocialGouv/recosante/commit/4f53333728ce66fd9174521d2a568216d1ef1a91))

# [1.10.0](https://github.com/SocialGouv/recosante/compare/v1.9.6...v1.10.0) (2023-09-22)


### Bug Fixes

* **k8s:** fix security context ([#226](https://github.com/SocialGouv/recosante/issues/226)) ([af7cbba](https://github.com/SocialGouv/recosante/commit/af7cbbafa929e2b187d02afec340e8fb60c7d124))


### Features

* `created_at` and `update_at` in every indice table ([#227](https://github.com/SocialGouv/recosante/issues/227)) ([38e7a71](https://github.com/SocialGouv/recosante/commit/38e7a713455dc51290a3644f81aba0b1185db043))
* adjust xs screen size to 336 px ([7447004](https://github.com/SocialGouv/recosante/commit/744700472b8b9594723e8ffcb74db4d4ea28a059))

## [1.9.6](https://github.com/SocialGouv/recosante/compare/v1.9.5...v1.9.6) (2023-09-21)


### Bug Fixes

* article vigilance météo ([#224](https://github.com/SocialGouv/recosante/issues/224)) ([e26fd7e](https://github.com/SocialGouv/recosante/commit/e26fd7e06622bff0db35f4d638532ac17f1e6991))
* return no site when no site ([#223](https://github.com/SocialGouv/recosante/issues/223)) ([42693c8](https://github.com/SocialGouv/recosante/commit/42693c869606962284bb473c1968699bb8abde81))

## [1.9.5](https://github.com/SocialGouv/recosante/compare/v1.9.4...v1.9.5) (2023-09-20)


### Bug Fixes

* very small screens ([#222](https://github.com/SocialGouv/recosante/issues/222)) ([1822a64](https://github.com/SocialGouv/recosante/commit/1822a6487d05179bececaa0526be4bcba62676fb))

## [1.9.4](https://github.com/SocialGouv/recosante/compare/v1.9.3...v1.9.4) (2023-09-20)


### Bug Fixes

* **app:** profile blank page ([#221](https://github.com/SocialGouv/recosante/issues/221)) ([d5952ad](https://github.com/SocialGouv/recosante/commit/d5952ada908238c73994a5d316769801298d300c))
* lint ([5af9876](https://github.com/SocialGouv/recosante/commit/5af9876cf84e132ef53f8bb762b5939d90ca6578))

## [1.9.3](https://github.com/SocialGouv/recosante/compare/v1.9.2...v1.9.3) (2023-09-20)


### Bug Fixes

* isnot(None) instead of is not None for sql query ([#219](https://github.com/SocialGouv/recosante/issues/219)) ([7a4746e](https://github.com/SocialGouv/recosante/commit/7a4746e0c24b0062c17c0a82b13c3d234b270b14))

## [1.9.2](https://github.com/SocialGouv/recosante/compare/v1.9.1...v1.9.2) (2023-09-19)


### Bug Fixes

* keep preprod on azure ([b63b11d](https://github.com/SocialGouv/recosante/commit/b63b11d8ae8ff87be440933d62ded531ced29e62))
* Move projectName to config ([17e296a](https://github.com/SocialGouv/recosante/commit/17e296a07ca8522ef094e0fa4074c35bf61aa71d))
* projectName empty ([daf4d02](https://github.com/SocialGouv/recosante/commit/daf4d0274c2b56b706c912d998558ad2638a447f))
* use cnpg + ovh in dev ([#197](https://github.com/SocialGouv/recosante/issues/197)) ([13616e9](https://github.com/SocialGouv/recosante/commit/13616e94d2a884876bcc8c307f3eb233514367f7))
* use cnpg for preprod ([d617909](https://github.com/SocialGouv/recosante/commit/d6179094b644efbe62c8b1a171cbc78fed3d7562))

## [1.9.1](https://github.com/SocialGouv/recosante/compare/v1.9.0...v1.9.1) (2023-09-15)


### Bug Fixes

* newsletter cron schedule back to early ([09f58d5](https://github.com/SocialGouv/recosante/commit/09f58d557a756e61a03cf7e413bc41765e8ff7e3))

# [1.9.0](https://github.com/SocialGouv/recosante/compare/v1.8.0...v1.9.0) (2023-09-13)


### Features

* **frontend:** filter articles by category ([#203](https://github.com/SocialGouv/recosante/issues/203)) ([04021fc](https://github.com/SocialGouv/recosante/commit/04021fcfed86d36a49bb3c97a5f00b4f66937503))

# [1.8.0](https://github.com/SocialGouv/recosante/compare/v1.7.2...v1.8.0) (2023-09-11)


### Features

* test new cron schedule for newsletter ([5c7abdb](https://github.com/SocialGouv/recosante/commit/5c7abdbab247c367a9ac2e14b899f3d9b8d562c4))

## [1.7.2](https://github.com/SocialGouv/recosante/compare/v1.7.1...v1.7.2) (2023-08-31)


### Bug Fixes

* **frontend:** background color pwa ([1170353](https://github.com/SocialGouv/recosante/commit/1170353036aefc2284920d75af13f29045ae46b7))

## [1.7.1](https://github.com/SocialGouv/recosante/compare/v1.7.0...v1.7.1) (2023-08-31)


### Bug Fixes

* **front:** web notifs ios ([#202](https://github.com/SocialGouv/recosante/issues/202)) ([91975fa](https://github.com/SocialGouv/recosante/commit/91975fa47b7e12e32a84436e16838f3162d10199))

# [1.7.0](https://github.com/SocialGouv/recosante/compare/v1.6.0...v1.7.0) (2023-08-29)


### Features

* google-site-verification meta tag ([#199](https://github.com/SocialGouv/recosante/issues/199)) ([01822db](https://github.com/SocialGouv/recosante/commit/01822db2eb3b774d5e54092452ee63478a16ac9b))

# [1.6.0](https://github.com/SocialGouv/recosante/compare/v1.5.3...v1.6.0) (2023-08-29)


### Features

* new subscription funnel ([#189](https://github.com/SocialGouv/recosante/issues/189)) ([0cf67b0](https://github.com/SocialGouv/recosante/commit/0cf67b01e002f71da1e008cb1a18e66ff655e967))

## [1.5.3](https://github.com/SocialGouv/recosante/compare/v1.5.2...v1.5.3) (2023-08-17)


### Bug Fixes

* iframe matomo event ([#196](https://github.com/SocialGouv/recosante/issues/196)) ([7905073](https://github.com/SocialGouv/recosante/commit/7905073ff1c33a03993fdf7916b75305a6c04fdb))

## [1.5.2](https://github.com/SocialGouv/recosante/compare/v1.5.1...v1.5.2) (2023-08-17)


### Bug Fixes

* iframe event when visible/invisible ([#195](https://github.com/SocialGouv/recosante/issues/195)) ([3af927e](https://github.com/SocialGouv/recosante/commit/3af927e9dcc3a31fcf42f8f36e075313e6c4ffad))

## [1.5.1](https://github.com/SocialGouv/recosante/compare/v1.5.0...v1.5.1) (2023-08-17)


### Bug Fixes

* butttons z-index ([cbcf801](https://github.com/SocialGouv/recosante/commit/cbcf801a70a1115f338883ad973464c1543b694c))

# [1.5.0](https://github.com/SocialGouv/recosante/compare/v1.4.5...v1.5.0) (2023-08-11)


### Features

* frontend design change ([#127](https://github.com/SocialGouv/recosante/issues/127)) ([e135283](https://github.com/SocialGouv/recosante/commit/e13528306c1307440b86732943182da108ce0e34))

## [1.4.5](https://github.com/SocialGouv/recosante/compare/v1.4.4...v1.4.5) (2023-08-04)


### Bug Fixes

* **deps:** update dependency cryptography to v41.0.3 [security] ([#136](https://github.com/SocialGouv/recosante/issues/136)) ([8da0b5e](https://github.com/SocialGouv/recosante/commit/8da0b5e076da4b422f11ef594573f93e79a585cd))

## [1.4.4](https://github.com/SocialGouv/recosante/compare/v1.4.3...v1.4.4) (2023-07-22)


### Bug Fixes

* **deps:** update dependency cryptography to v41.0.2 [security] ([#118](https://github.com/SocialGouv/recosante/issues/118)) ([6d00988](https://github.com/SocialGouv/recosante/commit/6d00988aef66cd4947e3c571d6964f7ba420e36e))
* same cron for push notifs and newsletter? ([#120](https://github.com/SocialGouv/recosante/issues/120)) ([9e9e300](https://github.com/SocialGouv/recosante/commit/9e9e30015ba45cfeb3931b97e75b91faa251b005))

## [1.4.3](https://github.com/SocialGouv/recosante/compare/v1.4.2...v1.4.3) (2023-07-07)


### Bug Fixes

* Add Arnaud to admin list ([aed1321](https://github.com/SocialGouv/recosante/commit/aed1321fb4be66c4e03b66f6f93cca7999d63dda))
* add new admin on list ([8b73863](https://github.com/SocialGouv/recosante/commit/8b73863216f58f47ae8792c077cc19953b449b12))
* admins list + default local docker env variables ([a76d80a](https://github.com/SocialGouv/recosante/commit/a76d80a9f2aa1f0776a76c733ecc585a4945eccb))
* node-sass for admin ([#106](https://github.com/SocialGouv/recosante/issues/106)) ([268de38](https://github.com/SocialGouv/recosante/commit/268de38370a90304cc1c12003621922e3c842aa4))

## [1.4.2](https://github.com/SocialGouv/recosante/compare/v1.4.1...v1.4.2) (2023-06-20)


### Bug Fixes

* add larger limits to indice worker ([0c65fec](https://github.com/SocialGouv/recosante/commit/0c65fecea2ddc7bd8f77a9230f8a014936038bc9))
* **deps:** update dependency cryptography to v41 [security] ([#88](https://github.com/SocialGouv/recosante/issues/88)) ([d85a871](https://github.com/SocialGouv/recosante/commit/d85a87114f9032a9c012ac0ca8fbe5f3685a50bf))

## [1.4.1](https://github.com/SocialGouv/recosante/compare/v1.4.0...v1.4.1) (2023-06-02)


### Bug Fixes

* **deps:** update dependency requests to v2.31.0 [security] ([#64](https://github.com/SocialGouv/recosante/issues/64)) ([15852f6](https://github.com/SocialGouv/recosante/commit/15852f6b5a7b504e5821dde005b5dae075b503c9))
* **indices:** Centre val de loire et martinique ([#72](https://github.com/SocialGouv/recosante/issues/72)) ([d4ec454](https://github.com/SocialGouv/recosante/commit/d4ec45418d8bd3fd6e9977a98b2df46a252644b5))
* **modals:** FocusTrap no tabbable child ([da993a0](https://github.com/SocialGouv/recosante/commit/da993a0cde5e34f44a308b7938410af04306ac98))

# [1.4.0](https://github.com/SocialGouv/recosante/compare/v1.3.0...v1.4.0) (2023-05-31)


### Bug Fixes

* **preprod:** add SIB api key ([#56](https://github.com/SocialGouv/recosante/issues/56)) ([173aa08](https://github.com/SocialGouv/recosante/commit/173aa08b85be19b12829f2ca3ae429d072cd4643))
* **semantic-release:** Script ([debc9db](https://github.com/SocialGouv/recosante/commit/debc9dbf8701ecbaae46a2edf862556ccdc5bffe))
* **vigilance-meteo:** Use new meteofrance API ([#71](https://github.com/SocialGouv/recosante/issues/71)) ([f38212d](https://github.com/SocialGouv/recosante/commit/f38212d6ef7bea3acd3dbf10b2cacd295d18b2d2))


### Features

* **lint:** api + pipeline ([#58](https://github.com/SocialGouv/recosante/issues/58)) ([5fa4a62](https://github.com/SocialGouv/recosante/commit/5fa4a62ce76f462c8dedea2fcd498d91900aed2e))
* **lint:** frontend ([#68](https://github.com/SocialGouv/recosante/issues/68)) ([464a45b](https://github.com/SocialGouv/recosante/commit/464a45b5462fe1ba1100cfea87f60e60b61c26a2))
* **mail:** update project ([#63](https://github.com/SocialGouv/recosante/issues/63)) ([f25633f](https://github.com/SocialGouv/recosante/commit/f25633f345ab18b0d9917c141ff5306828c9d0a8))
* **pylint:** enable on indice_pollution ([#57](https://github.com/SocialGouv/recosante/issues/57)) ([b2c828c](https://github.com/SocialGouv/recosante/commit/b2c828cedb065b57c7d151377418b9dcf348edb0))

# [1.3.0](https://github.com/SocialGouv/recosante/compare/v1.2.29...v1.3.0) (2023-05-16)


### Bug Fixes

* **ci:** db admin secret ([#47](https://github.com/SocialGouv/recosante/issues/47)) ([6857602](https://github.com/SocialGouv/recosante/commit/6857602d94801de04188f22c5bca5868505d0f19))
* **deps:** update all non-major dependencies ([#31](https://github.com/SocialGouv/recosante/issues/31)) ([71413fb](https://github.com/SocialGouv/recosante/commit/71413fb7279aa82206e18e5e15689a0704dc300b))
* **github:** deactivate auto release ([3a04a4d](https://github.com/SocialGouv/recosante/commit/3a04a4d3e0127b01cdde6df5d9a180235cffb92d))
* **project:** Make .gitignore common and add LICENSE ([#48](https://github.com/SocialGouv/recosante/issues/48)) ([1c1acf4](https://github.com/SocialGouv/recosante/commit/1c1acf43f18fe0eb6bd7b8bad784875b2bf1b08e))
* **project:** make it run locallly and remotely ([#46](https://github.com/SocialGouv/recosante/issues/46)) ([ef85776](https://github.com/SocialGouv/recosante/commit/ef8577699feba4002c035d8a01ff244f0cbc3130))
* ajout declaration a11y ([#36](https://github.com/SocialGouv/recosante/issues/36)) ([0768ef3](https://github.com/SocialGouv/recosante/commit/0768ef3d62fe07800a36f19047d701a20d1fc936))
* docker-images [#40](https://github.com/SocialGouv/recosante/issues/40) ([883a798](https://github.com/SocialGouv/recosante/commit/883a798c0691e7222ddc441f283ca2028256c933))
* reduce sentry errors (use warn instead of errors for very common errors) ([de924d8](https://github.com/SocialGouv/recosante/commit/de924d82546ec946b772aab1bbe8c4651f03a3a1))


### Features

* **api:** Move to poetry ([#55](https://github.com/SocialGouv/recosante/issues/55)) ([f812e73](https://github.com/SocialGouv/recosante/commit/f812e73a8b28d176c374ca83e695ef51a24b82de))
* **poetry:** indice pollution library ([#53](https://github.com/SocialGouv/recosante/issues/53)) ([ac1f070](https://github.com/SocialGouv/recosante/commit/ac1f0701ceccdd54120071db89d66b3a3d01e6bb))
* **test:** play them on ci ([#50](https://github.com/SocialGouv/recosante/issues/50)) ([63154b3](https://github.com/SocialGouv/recosante/commit/63154b3580127ac9d7d90cd7d1b0d8348759620e))

## [1.2.31](https://github.com/SocialGouv/recosante/compare/v1.2.30...v1.2.31) (2023-04-14)


### Bug Fixes

* **deps:** update all non-major dependencies ([#31](https://github.com/SocialGouv/recosante/issues/31)) ([1232fa2](https://github.com/SocialGouv/recosante/commit/1232fa2f48f5d476f2bf43d0ff46a8452cd55b75))
* ajout declaration a11y ([#36](https://github.com/SocialGouv/recosante/issues/36)) ([6f1e82d](https://github.com/SocialGouv/recosante/commit/6f1e82d3aa5b0b5ea81996a21cb66dda38d50f0b))

## [1.2.30](https://github.com/SocialGouv/recosante/compare/v1.2.29...v1.2.30) (2023-04-13)


### Bug Fixes

* reduce sentry errors (use warn instead of errors for very common errors) ([de924d8](https://github.com/SocialGouv/recosante/commit/de924d82546ec946b772aab1bbe8c4651f03a3a1))

## [1.2.29](https://github.com/SocialGouv/recosante/compare/v1.2.28...v1.2.29) (2023-04-11)


### Bug Fixes

* fix import using SIB api ([0ea8abf](https://github.com/SocialGouv/recosante/commit/0ea8abff7e2dbba66f904877db93e3ce7bcc01df))

## [1.2.28](https://github.com/SocialGouv/recosante/compare/v1.2.27...v1.2.28) (2023-04-10)


### Bug Fixes

* fix flower prod url ([#35](https://github.com/SocialGouv/recosante/issues/35)) ([f6183e9](https://github.com/SocialGouv/recosante/commit/f6183e933393be520ecf45b53f63f1d3f82e1c82))

## [1.2.27](https://github.com/SocialGouv/recosante/compare/v1.2.26...v1.2.27) (2023-04-10)


### Bug Fixes

* use legacy beta.gouv urls ([#34](https://github.com/SocialGouv/recosante/issues/34)) ([229d710](https://github.com/SocialGouv/recosante/commit/229d71096cb48dde711bfaed12849ad8220a5c23))

## [1.2.26](https://github.com/SocialGouv/recosante/compare/v1.2.25...v1.2.26) (2023-04-07)


### Bug Fixes

* redeploy on fabrique without SIB and VAPID ([dde4084](https://github.com/SocialGouv/recosante/commit/dde4084248be8b42c8e2228253cc24c3bf03f2d9))

## [1.2.25](https://github.com/SocialGouv/recosante/compare/v1.2.24...v1.2.25) (2023-04-07)


### Bug Fixes

* certSecretName ([84f7f61](https://github.com/SocialGouv/recosante/commit/84f7f615c9993a4a476623bf28b9716c6ab39944))

## [1.2.24](https://github.com/SocialGouv/recosante/compare/v1.2.23...v1.2.24) (2023-04-06)


### Bug Fixes

* gatsby env ([220120d](https://github.com/SocialGouv/recosante/commit/220120d758418a6daea9ea54f2d7a499efecfca9))

## [1.2.23](https://github.com/SocialGouv/recosante/compare/v1.2.22...v1.2.23) (2023-04-06)


### Bug Fixes

* apiUrl ([181f682](https://github.com/SocialGouv/recosante/commit/181f682595278bf157a5b9059c454c911b3238a5))

## [1.2.22](https://github.com/SocialGouv/recosante/compare/v1.2.21...v1.2.22) (2023-04-06)


### Bug Fixes

* apiUrl ([4a6e9b2](https://github.com/SocialGouv/recosante/commit/4a6e9b22dcf47f6429c8fc39ec98a5bfcbee66ee))

## [1.2.21](https://github.com/SocialGouv/recosante/compare/v1.2.20...v1.2.21) (2023-04-06)


### Bug Fixes

* add production secrets ([#33](https://github.com/SocialGouv/recosante/issues/33)) ([6eac9d0](https://github.com/SocialGouv/recosante/commit/6eac9d00f74f3912387f4d9fba1a9662c24db7b1))

## [1.2.20](https://github.com/SocialGouv/recosante/compare/v1.2.19...v1.2.20) (2023-04-06)


### Bug Fixes

* remove hardcoded api url ([7a544dd](https://github.com/SocialGouv/recosante/commit/7a544ddbd28ffdd4e388306e856647bfadda0f33))

## [1.2.19](https://github.com/SocialGouv/recosante/compare/v1.2.18...v1.2.19) (2023-04-04)


### Bug Fixes

* cleanup ([ac968d7](https://github.com/SocialGouv/recosante/commit/ac968d77c296154636a1dbe96124b2054d483f70))

## [1.2.18](https://github.com/SocialGouv/recosante/compare/v1.2.17...v1.2.18) (2023-04-04)


### Bug Fixes

* add misisn gimport ([7e42825](https://github.com/SocialGouv/recosante/commit/7e42825f0933f478a6b11ff3ac1c3223a4987f52))

## [1.2.17](https://github.com/SocialGouv/recosante/compare/v1.2.16...v1.2.17) (2023-04-04)


### Bug Fixes

* add log in stats/email ([f0856f3](https://github.com/SocialGouv/recosante/commit/f0856f3488b6d5f4cc7af7717e03ee7c72709359))

## [1.2.16](https://github.com/SocialGouv/recosante/compare/v1.2.15...v1.2.16) (2023-04-04)


### Bug Fixes

* add uwsgi http-timeout ([82971d7](https://github.com/SocialGouv/recosante/commit/82971d7f91c170aa0e0f73ea91f2cefc80051d39))

## [1.2.15](https://github.com/SocialGouv/recosante/compare/v1.2.14...v1.2.15) (2023-04-04)


### Bug Fixes

* add forceRestart on redis ([6c1b122](https://github.com/SocialGouv/recosante/commit/6c1b122ebb5eccc514fa1d74aad5e820708e6301))
* try proxy-body-size ([b8ba295](https://github.com/SocialGouv/recosante/commit/b8ba295c807a3f2d8db0c5031e12b4342fca0940))

## [1.2.14](https://github.com/SocialGouv/recosante/compare/v1.2.13...v1.2.14) (2023-04-04)


### Bug Fixes

* increase api limits and uwsgi processes for healthcheck ([21ec9d2](https://github.com/SocialGouv/recosante/commit/21ec9d2006d5552d854396052f5eb7612b263a34))

## [1.2.13](https://github.com/SocialGouv/recosante/compare/v1.2.12...v1.2.13) (2023-04-04)


### Bug Fixes

* move timeout annotaiton to api ingress ([cf73377](https://github.com/SocialGouv/recosante/commit/cf733777be9438ed3fd75d42e85ba2bc4aac429b))

## [1.2.12](https://github.com/SocialGouv/recosante/compare/v1.2.11...v1.2.12) (2023-04-04)


### Bug Fixes

* increase frontend ingress timeout for stats route ([4a57007](https://github.com/SocialGouv/recosante/commit/4a57007c02519b91d282e3bb8d81472912bcc4bd))

## [1.2.11](https://github.com/SocialGouv/recosante/compare/v1.2.10...v1.2.11) (2023-04-03)


### Bug Fixes

* add host ([661f4f8](https://github.com/SocialGouv/recosante/commit/661f4f80c36270477f3c1edac7e3c25d819e99ea))

## [1.2.10](https://github.com/SocialGouv/recosante/compare/v1.2.9...v1.2.10) (2023-04-03)


### Bug Fixes

* add healthz page to frontend ([52645ae](https://github.com/SocialGouv/recosante/commit/52645aecc7dc270183eb2957ff339e97096bfe48))

## [1.2.9](https://github.com/SocialGouv/recosante/compare/v1.2.8...v1.2.9) (2023-04-03)


### Bug Fixes

* Fix requests/limits for node frontend ([91ed0de](https://github.com/SocialGouv/recosante/commit/91ed0de3cfb3ba301c62c0b07eb2ac03d6e9474e))

## [1.2.8](https://github.com/SocialGouv/recosante/compare/v1.2.7...v1.2.8) (2023-04-03)


### Bug Fixes

* remove yarn ([f7e46d2](https://github.com/SocialGouv/recosante/commit/f7e46d20044be211be297880a846656291032f55))

## [1.2.7](https://github.com/SocialGouv/recosante/compare/v1.2.6...v1.2.7) (2023-04-03)


### Bug Fixes

* use nodejs server for frontend ([be61d17](https://github.com/SocialGouv/recosante/commit/be61d17ab4677cc6157f2be995da74cb9df9d7f6))

## [1.2.6](https://github.com/SocialGouv/recosante/compare/v1.2.5...v1.2.6) (2023-04-03)


### Bug Fixes

* remove beta.gouv ([c982e97](https://github.com/SocialGouv/recosante/commit/c982e97aba929a1fa133212e8fbc3b9c03cb5c01))

## [1.2.5](https://github.com/SocialGouv/recosante/compare/v1.2.4...v1.2.5) (2023-04-03)


### Bug Fixes

* remove ftp prefix in FS_BUCKET_URL ([f0b1fb9](https://github.com/SocialGouv/recosante/commit/f0b1fb9ab3433010cd7087362c38af5d12f35f4d))

## [1.2.4](https://github.com/SocialGouv/recosante/compare/v1.2.3...v1.2.4) (2023-04-03)


### Bug Fixes

* attach traceback on error logs ([26bf8fe](https://github.com/SocialGouv/recosante/commit/26bf8fe6a6eedc3550daf13e9e15a3152a59f3ed))

## [1.2.3](https://github.com/SocialGouv/recosante/compare/v1.2.2...v1.2.3) (2023-04-03)


### Bug Fixes

* Add flower persistent=true ([9943656](https://github.com/SocialGouv/recosante/commit/9943656cf291b18f01bed17d151d2197ef2fa1fe))

## [1.2.2](https://github.com/SocialGouv/recosante/compare/v1.2.1...v1.2.2) (2023-04-03)


### Bug Fixes

* add environment for sentry and remove purge celery ([5bcedcf](https://github.com/SocialGouv/recosante/commit/5bcedcfd40d13ca2e98477a8aabab582a89085d3))

## [1.2.1](https://github.com/SocialGouv/recosante/compare/v1.2.0...v1.2.1) (2023-04-01)


### Bug Fixes

* disable vapid ([2b33a20](https://github.com/SocialGouv/recosante/commit/2b33a20e3389c06505f100683e5d68b9b524c080))

# [1.2.0](https://github.com/SocialGouv/recosante/compare/v1.1.12...v1.2.0) (2023-03-31)


### Bug Fixes

* add releaserc ([3e40571](https://github.com/SocialGouv/recosante/commit/3e4057170a9600b685117c57d3c68d2279d7d50b))


### Features

* add redis persitance ([8d18a38](https://github.com/SocialGouv/recosante/commit/8d18a38cf352a4683df5026a56ab1a92a371dd9d))
