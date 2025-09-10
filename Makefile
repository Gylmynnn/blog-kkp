run:
	@bun run dev
up:
	@docker-compose up -d
down:
	@docker-compose down
migrate:
	@bun run db:migrate
generate:
	@bun run db:generate
seed:
	@bun run db:seed

.PHONY: run up down migrate generate
