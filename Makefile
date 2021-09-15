.SILENT:

test:
	docker-compose run --rm test
	$(docker-compose-down)
.PHONY: test