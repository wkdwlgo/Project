import Image from 'next/image';
import SkeletonSlot from './SkeletonSlot';

function SkeletonSlotList() {
  return (
    <section className="w-full bg-primary-20">
      <div className="mx-auto flex h-full max-w-6xl flex-col px-6 md:flex-row md:gap-6 md:px-4 xl:px-0">
        <div className="mt-6 flex flex-1 flex-col gap-3 md:relative md:my-4 md:mt-5 md:gap-0 xl:my-10 xl:gap-11">
          <div className="flex md:items-end xl:items-center xl:justify-between">
            <h1 className="mb-0 w-full text-lg font-semibold text-secondary-bg md:mb-10 md:w-auto md:text-2xl xl:mb-0 xl:w-full">
              마감 임박! 빨리 모여방
            </h1>
            <div className="mb-0 flex h-6 w-12 items-center rounded-md bg-secondary-90 md:mb-11 md:ml-14 md:mr-auto xl:mb-0 xl:ml-0 xl:w-[50px] xl:flex-auto" />
            <Image
              src="/images/puzzle_deadline_tb.png"
              alt="마감 임박 퍼즐 캐릭터"
              width={204}
              height={158}
              quality={100}
              className="mt-auto hidden max-h-full md:block xl:hidden"
            />
          </div>
          <div className="grid grid-cols-1 grid-rows-1 gap-3 md:grid-cols-2 md:gap-7">
            <SkeletonSlot />
            <SkeletonSlot />
          </div>
        </div>
        <div className="ml-auto mt-2 max-h-[109px] max-w-[153px] md:hidden">
          <Image
            src="/images/puzzle_deadline_mb.png"
            alt="마감 임박 퍼즐 캐릭터"
            quality={100}
            width={109}
            height={153}
            className="max-h-full max-w-full"
          />
        </div>
        <Image
          src="/images/puzzle_deadline_pc.png"
          alt="마감 임박 퍼즐 캐릭터"
          quality={100}
          width={487}
          height={466}
          className="mt-auto hidden md:hidden xl:block xl:max-h-[466px] xl:max-w-[457px]"
        />
      </div>
    </section>
  );
}

export default SkeletonSlotList;
