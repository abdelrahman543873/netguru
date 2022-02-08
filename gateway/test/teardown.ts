export default async function (): Promise<void> {
  await global.app.close();
}
