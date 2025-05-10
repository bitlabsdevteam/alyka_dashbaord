// src/app/(app)/feedback/page.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MessageCircleQuestion } from 'lucide-react';

export default function FeedbackPage() {
  const { t } = useLanguage();
  const [satisfaction, setSatisfaction] = useState<string | undefined>(undefined);
  const [comments, setComments] = useState('');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!satisfaction && comments.trim() === '') {
      toast({
        title: t('feedbackPage.toast.errorTitle'),
        description: t('feedbackPage.toast.errorDescriptionEmpty'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would send this data to your backend.
    console.log({ satisfaction, comments });

    toast({
      title: t('feedbackPage.toast.successTitle'),
      description: t('feedbackPage.toast.successDescription'),
    });
    setSatisfaction(undefined);
    setComments('');
    setIsSubmitting(false);
  };


  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <MessageCircleQuestion className="mr-2 h-6 w-6 text-primary" />
            {t('feedbackPage.title')}
          </CardTitle>
          <CardDescription>{t('feedbackPage.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="satisfaction" className="text-base">{t('feedbackPage.satisfactionLabel')}</Label>
            <RadioGroup 
              value={satisfaction} 
              onValueChange={setSatisfaction} 
              className="mt-2 space-y-2"
              id="satisfaction"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="very-satisfied" id="very-satisfied" />
                <Label htmlFor="very-satisfied" className="font-normal text-base cursor-pointer">{t('feedbackPage.options.verySatisfied')}</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="satisfied" id="satisfied" />
                <Label htmlFor="satisfied" className="font-normal text-base cursor-pointer">{t('feedbackPage.options.satisfied')}</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral" className="font-normal text-base cursor-pointer">{t('feedbackPage.options.neutral')}</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="dissatisfied" id="dissatisfied" />
                <Label htmlFor="dissatisfied" className="font-normal text-base cursor-pointer">{t('feedbackPage.options.dissatisfied')}</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="very-dissatisfied" id="very-dissatisfied" />
                <Label htmlFor="very-dissatisfied" className="font-normal text-base cursor-pointer">{t('feedbackPage.options.veryDissatisfied')}</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="comments" className="text-base">{t('feedbackPage.commentsLabel')}</Label>
            <Textarea 
              id="comments" 
              placeholder={t('feedbackPage.commentsPlaceholder')} 
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-2 min-h-[120px] text-base" 
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isSubmitting ? t('common.saving', {defaultValue: 'Submitting...'}) : t('feedbackPage.submitButton')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
