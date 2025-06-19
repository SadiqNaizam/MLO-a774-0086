import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2, Github } from 'lucide-react'; // Example icons

// A simple type for social providers, extend as needed
// For more robust icon handling, you might map provider keys to specific icon components
// or use a library that provides social icons.
export type SocialProvider = 'google' | 'github' | 'facebook'; // Add more providers as needed

interface SocialAuthButtonProps extends ButtonProps {
  provider: SocialProvider;
  isLoading?: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}

// Helper to get icon and text based on provider
const getProviderDetails = (provider: SocialProvider) => {
  switch (provider) {
    case 'google':
      // For Google, you'd typically use a dedicated Google icon.
      // Lucide-react doesn't have a Google logo directly.
      // Placeholder: You might use a generic icon or install a dedicated library for social icons.
      // For this example, we'll just use text.
      return { icon: null, text: 'Continue with Google' };
    case 'github':
      return { icon: <Github className="mr-2 h-4 w-4" />, text: 'Continue with GitHub' };
    case 'facebook':
      // Similar to Google, a dedicated Facebook icon would be best.
      return { icon: null, text: 'Continue with Facebook' };
    default:
      return { icon: null, text: 'Continue with Social Account' };
  }
};

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  isLoading = false,
  onClick,
  fullWidth = true,
  variant = "outline", // Default to outline variant
  children,
  ...props
}) => {
  console.log(`Rendering SocialAuthButton for provider: ${provider}, isLoading: ${isLoading}`);

  const { icon: ProviderIcon, text: providerText } = getProviderDetails(provider);

  return (
    <Button
      variant={variant}
      type="button" // Important: ensure it's not a submit button by default if used in a form
      onClick={onClick}
      disabled={isLoading}
      className={`relative ${fullWidth ? 'w-full' : ''}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        ProviderIcon
      )}
      {children || providerText}
    </Button>
  );
};

export default SocialAuthButton;