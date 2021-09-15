SHELL := bash
.ONESHELL:
.SILENT:
.SHELLFLAGS := -euo pipefail -c

define docker-compose-run
	docker-compose run --rm $(1) && exit_status=$$? || exit_status=$$?
	[ "$$exit_status" -ne 0 ] && docker-compose logs
	docker-compose down
	(exit $$exit_status)
endef

test:
	$(call docker-compose-run, test)
.PHONY: test