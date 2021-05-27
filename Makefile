install:
	docker-compose -f docker-compose.builder.yml run --rm install
local:
	docker-compose -f docker-compose.local.yml up
dev:
	docker-compose -f docker-compose.development.yml up
