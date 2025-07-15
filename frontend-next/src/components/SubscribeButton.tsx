'use client';

interface SubscribeButtonProps {
  indicator?: string;
  disabled?: boolean;
  onClick?: () => void;
  place?: {
    code: string;
    nom: string;
  };
  className?: string;
}

export default function SubscribeButton({ 
}: SubscribeButtonProps) {
  return (
    <></>
  );
}

export function FixedSubscribeButton({ place }: { place?: { code: string; nom: string } }) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SubscribeButton
        indicator="all"
        place={place}
        className="shadow-lg"
      />
    </div>
  );
} 