# Static release Makefile
# Fully Promoted Cameroon

VERSION_FILE := VERSION
CHANGELOG := changes.txt

# Inputs from GitHub Actions
EVENT ?= push
JS_CHANGED ?= false
CSS_CHANGED ?= false
BIN_CHANGED ?= false

split-dot = $(word $2,$(subst ., ,$1))

TAG := $(shell grep VERSION $(VERSION_FILE) | cut -d= -f2)

CHANGELIST := $(shell git diff --name-only HEAD^ HEAD 2>/dev/null)

.PHONY: version
version:
	@echo "$(TAG)"

.PHONY: stage-version
stage-version:
	$(info staging version..)
	@mkdir -p js/v$(TAG);
	@cp -r js/_/* js/v$(TAG)/;
	@mkdir -p css/v$(TAG);
	@cp -r css/_/* css/v$(TAG)/;


.wrangler:
	$(info intalling wrangler CLI)
	@npm install -g wrangler

.login:
	$(info login to cloudflare)
	@wrangler login

PHONY: env
env: .wrangler .login

run:
	@echo -e "serving worker locally:\n - menu > http://127.0.0.1:8787/ \n - deck > http://127.0.0.1:8787/gravitondeck"
	@wrangler dev --remote --env dev

test:
	$(info testing cors header)
	curl -I http://localhost:8787/static/_/bin/logo.svg | grep -i access-control
help:
	@echo "Available commands:\n\
\t> run: run server locally\n\
\t> test: run local test\n\
\t> env: install wrangle cli"