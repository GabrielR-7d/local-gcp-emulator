.SILENT:

define docker-compose-run
	docker-compose run --rm $(1) && exit_status=$$? || exit_status=$$?
	[ "$$exit_status" -ne 0 ] && docker-compose logs
	docker-compose down
	(exit $$exit_status)
endef

test:
	docker-compose run --rm test
	$(docker-compose-down)
.PHONY: test