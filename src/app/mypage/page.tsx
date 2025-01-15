/* eslint-disable prettier/prettier */

'use client';

import { mockUser } from '@/data/mockUser';
import { mockGatherings } from '@/data/mockGatherings';
import MyCreateGathering from '@/components/mypage/myCreateGathering';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import IconButton from '@/components/@shared/IconButton';
import { useModal } from '@/hooks/useModal';
import MyReview from '../../components/mypage/myReview';
import MyProfileEditModal from '../../components/mypage/myProfileEditModal';
import MyGathering from '../../components/mypage/myGathering';

export default function MyPage() {
  const user = mockUser;
  const levelImage = mockGatherings.length;
  const {
    isOpen: isEditModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const navLinks = [
    { label: '나의 모임', component: <MyGathering /> },
    { label: '나의 리뷰', component: <MyReview /> },
    {
      label: '내가 만든 모임',
      component: <MyCreateGathering userID={user.userID} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(navLinks[0].label);
  const [isMobile, setIsMobile] = useState(false);

  const navClick = (label: string) => {
    setActiveTab(label);
  };

  const renderActiveComponent = () => {
    const activeLink = navLinks.find((link) => link.label === activeTab);
    return activeLink?.component;
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <main className="relative top-[100px] mx-10 xl:mx-auto xl:w-[1166px]">
      <p className="text-xl font-bold">{`안녕하세요 ${user.nickname}님!`}</p>
      <div className="bg-primary-30 relative -z-20 mb-5 mt-8 flex items-center justify-between overflow-hidden rounded-[25px] border px-3 py-8 md:mb-7 md:px-10">
        <div className="text-text-primary z-10 flex flex-col gap-3">
          <Image
            src={user.image || '/profile_image_default.png'}
            width={66}
            height={66}
            alt="프로필 이미지 미리보기"
            className="h-[56px] w-[56px] rounded-full md:h-[66px] md:w-[66px]"
          />
          <div>
            <p className="text-base font-bold md:text-2xl">{user.nickname}</p>
            <p className="text-sm md:text-base">{user.email}</p>
          </div>
        </div>
        <Image
          src={`/myprofile_bg/${isMobile ? 's' : 'l'}/${levelImage}.svg`}
          width={isMobile ? 241 : 612}
          height={isMobile ? 121 : 224}
          alt="프로필 배경"
          className="absolute left-16 top-3 -z-10 md:-top-6 md:left-64"
        />
        <IconButton
          src="/icons/pencil.svg"
          alt="연필 아이콘"
          onClick={openEditModal}
          className="z-10"
        >
          프로필 편집
        </IconButton>
        <MyProfileEditModal
          isModal={isEditModal}
          setIsModal={closeEditModal}
          nickname={user.nickname}
          image={user.image}
        />
      </div>
      <hr className="mb-7" />
      <div className="mx-2 md:mx-12">
        <nav className="flex gap-8 md:gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className={`pb-3 text-base font-bold md:text-lg ${
                activeTab === link.label ? 'border-b-2 border-white' : ''
              }`}
              onClick={() => navClick(link.label)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="mx-3 mb-10 mt-8">{renderActiveComponent()}</div>
      </div>
    </main>
  );
}
