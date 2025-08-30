import type { Newsletter as NewsletterType } from '~/types/landing';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

interface NewsletterProps extends NewsletterType {}

export function Newsletter({
  title,
  description,
  email,
  submit,
}: NewsletterProps) {
  return (
    <section className='bg-gray-900 rounded-xl p-8 mb-10'>
      <div className='grid md:grid-cols-2 gap-8 items-center'>
        <div className='space-y-4'>
          {title && <h2 className='text-2xl font-bold'>{title}</h2>}
          {description && <p className='text-gray-400'>{description}</p>}
        </div>
        <form className='flex gap-2'>
          <Input
            id='email'
            type={email?.type}
            placeholder={email?.placeholder}
            className='bg-black border-gray-800 focus-visible:ring-purple-500'
            required
            name={email?.name || email?.label || email?.type}
          />
          <Button
            type='submit'
            className='bg-purple-600 hover:bg-purple-700 whitespace-nowrap cursor-pointer'
            disabled={false}
          >
            {submit.label}
          </Button>
        </form>
      </div>
    </section>
  );
}
