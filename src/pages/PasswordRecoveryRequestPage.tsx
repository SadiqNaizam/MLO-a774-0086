import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertCircle, CheckCircle } from 'lucide-react';

const recoveryRequestSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type RecoveryRequestFormValues = z.infer<typeof recoveryRequestSchema>;

const PasswordRecoveryRequestPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RecoveryRequestFormValues>({
    resolver: zodResolver(recoveryRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: RecoveryRequestFormValues) => {
    console.log('PasswordRecoveryRequestPage submitted with data:', data);
    setIsLoading(true);
    setMessage(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In a real app, you'd check if the email exists and send the email.
    // For this demo, we'll always show a success message.
    setMessage({ type: 'success', text: 'If an account exists for this email, a password reset link has been sent. Please check your inbox.' });
    console.log('Password recovery email sent (simulated) to:', data.email);
    setIsLoading(false);
    form.reset(); // Clear the form
  };

  console.log('PasswordRecoveryRequestPage loaded');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Forgot Your Password?</CardTitle>
          <CardDescription>
            No worries! Enter your email address below, and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {message && (
                <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className={message.type === 'success' ? 'bg-green-50 border-green-300 dark:bg-green-900 dark:border-green-700' : ''}>
                  {message.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{message.type === 'success' ? 'Link Sent' : 'Error'}</AlertTitle>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending Link...' : 'Send Reset Link'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center">
          <Link to="/login" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PasswordRecoveryRequestPage;