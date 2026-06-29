import { prisma } from '@/lib/prisma';
import SettingsClient from '@/components/SettingsClient';

export const dynamic = 'force-dynamic';

export default async function Settings() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const rawSettings = await prisma.systemSetting.findMany();
  const settingsMap: Record<string, string> = {};
  rawSettings.forEach(s => settingsMap[s.key] = s.value);

  return <SettingsClient initialSettings={settingsMap} initialUsers={users} />;
}
