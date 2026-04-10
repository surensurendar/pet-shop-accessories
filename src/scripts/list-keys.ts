import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function listPublishableKeys({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  const { data } = await query.graph({
    entity: "api_key",
    fields: ["id", "token", "title", "type"],
    filters: {
      type: "publishable",
    },
  });

  if (data.length === 0) {
    logger.info("No publishable API keys found.");
  } else {
    logger.info("Current Publishable API Keys:");
    data.forEach((key: any) => {
      logger.info(`- [${key.title}] ID: ${key.id} | TOKEN: ${key.token}`);
    });
  }
}
