# Static release Makefile
# Fully Promoted Cameroon

VERSION_FILE := VERSION
CHANGELOG := changes.txt

# Inputs from GitHub Actions
EVENT ?= push
TAG ?=
JS_CHANGED ?= false
CSS_CHANGED ?= false
BIN_CHANGED ?= false

split-dot = $(word $2,$(subst ., ,$1))

# Read MAJOR
MAJOR := $(shell grep MAJOR $(VERSION_FILE) | cut -d= -f2)

LAST = $(shell git describe --tags --abbrev=0 2>/dev/null || echo v$(MAJOR).0.0)
MINOR := $(call split-dot,$(LAST),2)
PATCH := $(call split-dot,$(LAST),3)

ifndef TAG
	TAG = $(LAST)
endif

ifeq "$(JS_CHANGED)" "true"
	MINOR=$$((MINOR+1))
	PATCH=0
endif

ifeq "$(CSS_CHANGED)" "true"
	PATCH=$$((PATCH+1))
endif

LAST="v$(MAJOR).$(MINOR).$(PATCH)"

.PHONY: print-version
print-version:
	@echo "$(LAST)"

.PHONY: stage-version
stage-version:
	$(info staging version..)
	@mkdir -p js/$(TAG);
	@cp -r js/_/* js/$(TAG)/;
	@mkdir -p css/$(TAG);
	@cp -r css/_/* css/$(TAG)/;

.PHONY: changelog
changelog:
	$(info changelog creation..)
	@git fetch origin main
	@CHANGELIST=$(git diff --name-only origin/main...HEAD 2>/dev/null)
	$(shell echo "$(CHANGELIST)" | grep '^js/_' && echo JS=true || echo JS=false >  $(CHANGELOG))
	$(shell echo "$(CHANGELIST)" | grep '^css/_' && echo CSS=true || echo CSS=false >>  $(CHANGELOG))
	$(shell echo "$(CHANGELIST)" | grep '^bin/_' && echo BIN=true || echo BIN=false >>  $(CHANGELOG))
