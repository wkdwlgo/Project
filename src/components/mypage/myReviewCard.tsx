/* eslint-disable prettier/prettier */

'use client';

import { useState } from 'react';

import { ReviewDto } from '@/types/review.types';
import Image from 'next/image';
import Rating from '../@shared/rating/Rating';
import MyReviewModal from './myReviewModal';
import DeleteModal from './deleteModal';

export default function MyReviewCard({
  score,
  comment,
  createdAt,
  Gathering,
  User,
}: ReviewDto['get']) {
  const [isEditModal, setEditIsModal] = useState(false);
  const [isDeleteModal, setDeleteIsModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openEditModalHandler = () => {
    setEditIsModal(true);
  };
  const openDeleteModalHandler = () => {
    setDeleteIsModal(true);
  };

  const liDropdowns = [
    { label: '수정하기', clickHandler: openEditModalHandler },
    { label: '삭제하기', clickHandler: openDeleteModalHandler },
  ];

  return (
    <article className="relative flex w-full flex-col gap-2 rounded-xl bg-default-tertiary md:max-h-[200px] md:flex-row xl:max-h-[170px]">
      <Image
        src={Gathering.image}
        alt={Gathering.themeName}
        width={240}
        height={170}
        quality={100}
        className="w-full rounded-t-xl bg-default-tertiary md:w-60 md:rounded-l-xl md:rounded-r-none"
      />

      <div className="mx-4 my-5 flex flex-1 flex-col justify-between md:mx-6 md:my-5">
        <div className="flex flex-col gap-[7px]">
          <div className="group relative flex items-center justify-between">
            <Rating rating={score} width={120} height={24} />
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <Image
                  src="/see_more_icon.png"
                  width={24}
                  height={24}
                  alt="드롭다운 클릭 버튼"
                />
              </button>
              {isMenuOpen && (
                <ul className="absolute -right-6 z-50 mt-2 w-32 rounded-md bg-secondary-80 shadow-md md:-right-20">
                  {liDropdowns.map((liDropdown) => (
                    <li key={liDropdown.label}>
                      <button
                        onClick={liDropdown.clickHandler}
                        type="button"
                        className="w-full px-4 py-2 text-left hover:bg-secondary-60"
                      >
                        {liDropdown.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <h2 className="text-xs font-medium text-secondary-40">
            {Gathering.themeName}
          </h2>
          <p className="text-sm font-medium text-white md:mt-5">{comment}</p>
        </div>
      </div>
      <MyReviewModal
        isModal={isEditModal}
        setIsModal={setEditIsModal}
        comment={comment}
        score={score}
      />
      <DeleteModal
        isModal={isDeleteModal}
        setIsModal={setDeleteIsModal}
        classification="delete"
      />
    </article>
  );
}
