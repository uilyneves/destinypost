'use client';

export const Logo = () => {
  return (
    <div className="mt-[8px] flex h-[60px] w-[86px] items-center justify-center">
      <img
        src="/multipost-icon.svg"
        alt="MultiPost"
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
      />
    </div>
  );
};
