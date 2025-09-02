import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { cn } from '~/lib/utils';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=move]:transition-none data-[swipe=cancel]:translate-x-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'destructive border-destructive bg-destructive text-destructive-foreground',
        success:
          'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
        warning:
          'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100',
        info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const toastIconVariants = cva('h-5 w-5', {
  variants: {
    variant: {
      default: 'text-foreground',
      destructive: 'text-destructive-foreground',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      info: 'text-blue-600 dark:text-blue-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
  showCloseButton?: boolean;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant,
      title,
      description,
      action,
      onClose,
      showCloseButton = true,
      ...props
    },
    ref
  ) => {
    const getIcon = () => {
      switch (variant) {
        case 'success':
          return <CheckCircle className={cn(toastIconVariants({ variant }))} />;
        case 'destructive':
          return <XCircle className={cn(toastIconVariants({ variant }))} />;
        case 'warning':
          return <AlertCircle className={cn(toastIconVariants({ variant }))} />;
        case 'info':
          return <Info className={cn(toastIconVariants({ variant }))} />;
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className='flex items-start gap-3'>
          {getIcon() && <div className='flex-shrink-0'>{getIcon()}</div>}
          <div className='flex-1 space-y-1'>
            {title && (
              <div className='text-sm font-semibold [&+div]:mt-0.5'>
                {title}
              </div>
            )}
            {description && (
              <div className='text-sm opacity-90'>{description}</div>
            )}
          </div>
        </div>
        {action && <div className='flex-shrink-0'>{action}</div>}
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className='absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-100 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>
    );
  }
);
Toast.displayName = 'Toast';

export { Toast, toastVariants };
