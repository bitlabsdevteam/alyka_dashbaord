// src/app/(app)/settings/page.tsx
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/context/language-context';
import { useToast } from '@/hooks/use-toast';
import { Settings as SettingsIcon, CreditCard, Server, Save, TestTubeDiagonal } from 'lucide-react';

export default function SettingsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  // State for MCP Configuration (example)
  const [mcpServerAddress, setMcpServerAddress] = React.useState('');
  const [mcpPort, setMcpPort] = React.useState('');
  const [mcpApiKey, setMcpApiKey] = React.useState('');
  const [isMcpEnabled, setIsMcpEnabled] = React.useState(false);
  const [isSavingMcp, setIsSavingMcp] = React.useState(false);

  const handleSaveMcpConfig = async () => {
    setIsSavingMcp(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSavingMcp(false);
    toast({
      title: t('settingsPage.mcpConfig.toast.saveSuccessTitle'),
      description: t('settingsPage.mcpConfig.toast.saveSuccessDescription'),
    });
    // In a real app, you would send this data to your backend.
    console.log({ mcpServerAddress, mcpPort, mcpApiKey, isMcpEnabled });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <SettingsIcon className="mr-3 h-8 w-8 text-primary" />
          {t('settingsPage.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('settingsPage.description')}
        </p>
      </div>

      {/* Payment Method Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <CreditCard className="mr-2 h-5 w-5 text-primary" />
            {t('settingsPage.paymentMethod.title')}
          </CardTitle>
          <CardDescription>
            {t('settingsPage.paymentMethod.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t('settingsPage.paymentMethod.currentMethod')}</p>
            <p className="text-lg">{t('settingsPage.paymentMethod.cardNumberEndingIn')}</p>
          </div>
          {/* <p className="text-sm text-muted-foreground">{t('settingsPage.paymentMethod.noPaymentMethod')}</p> */}
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline">{t('settingsPage.paymentMethod.updateButton')}</Button>
          <Button variant="ghost">{t('settingsPage.paymentMethod.billingHistoryButton')}</Button>
        </CardFooter>
      </Card>

      {/* MCP Server Configuration Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Server className="mr-2 h-5 w-5 text-primary" />
            {t('settingsPage.mcpConfig.title')}
          </CardTitle>
          <CardDescription>
            {t('settingsPage.mcpConfig.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mcpServerAddress">{t('settingsPage.mcpConfig.serverAddressLabel')}</Label>
            <Input
              id="mcpServerAddress"
              value={mcpServerAddress}
              onChange={(e) => setMcpServerAddress(e.target.value)}
              placeholder={t('settingsPage.mcpConfig.serverAddressPlaceholder')}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mcpPort">{t('settingsPage.mcpConfig.portLabel')}</Label>
              <Input
                id="mcpPort"
                type="number"
                value={mcpPort}
                onChange={(e) => setMcpPort(e.target.value)}
                placeholder={t('settingsPage.mcpConfig.portPlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mcpApiKey">{t('settingsPage.mcpConfig.apiKeyLabel')}</Label>
              <Input
                id="mcpApiKey"
                type="password"
                value={mcpApiKey}
                onChange={(e) => setMcpApiKey(e.target.value)}
                placeholder={t('settingsPage.mcpConfig.apiKeyPlaceholder')}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="enableMcp"
              checked={isMcpEnabled}
              onCheckedChange={setIsMcpEnabled}
            />
            <Label htmlFor="enableMcp" className="cursor-pointer">
              {t('settingsPage.mcpConfig.enableMcpLabel')}
            </Label>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button onClick={handleSaveMcpConfig} disabled={isSavingMcp}>
            <Save className="mr-2 h-4 w-4" />
            {isSavingMcp ? t('common.saving', {defaultValue: 'Saving...'}) : t('settingsPage.mcpConfig.saveButton')}
          </Button>
          <Button variant="outline">
            <TestTubeDiagonal className="mr-2 h-4 w-4" />
            {t('settingsPage.mcpConfig.testConnectionButton')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
