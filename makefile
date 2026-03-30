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

