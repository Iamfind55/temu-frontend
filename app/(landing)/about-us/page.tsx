"use client"

import Image from "next/image"
import { useTranslation } from "react-i18next"

export default function AboutUsPage() {
  const { t } = useTranslation('landing')

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* What is Temu? */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
            {t('whatIsTemu')}
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl flex items-center justify-center">
                <Image
                  src="/images/about-01.webp"
                  alt="Temu Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('temuDescription')}
            </p>
          </div>
        </section>

        {/* What does Temu mean? */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
            {t('whatDoesTemuMean')}
          </h2>
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">
              {t('temuSlogan')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('temuMeaningDesc')}
            </p>
          </div>
        </section>

        {/* Where are the products sold on Temu shipped from? */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
            {t('whereShippedFrom')}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('shippingOriginDesc')}
          </p>
        </section>

        {/* Temu's strengths */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
            {t('temuStrengths')}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t('temuStrengthsDesc')}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <span className="font-bold">{t('wideSelection')}</span>
            </li>
            <li>
              <span className="font-bold">{t('logisticsCollaboration')}</span>
            </li>
            <li>
              <span className="font-bold">{t('c2m')}</span>
            </li>
          </ul>
        </section>

        {/* Our values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-12">
            {t('ourValues')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Empowerment */}
            <div className="flex items-center gap-4">
              <div className="w-30 h-30 flex-shrink-0">
                <Image
                  src="/images/about-02.webp"
                  alt="Temu Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-2">
                  {t('empowerment')}
                </h3>
                <p className="text-gray-700">
                  {t('empowermentDesc')}
                </p>
              </div>
            </div>

            {/* Inclusion and diversity */}
            <div className="flex items-center gap-4">
              <div className="w-30 h-30 flex-shrink-0">
                <Image
                  src="/images/about-03.webp"
                  alt="Temu Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-2">
                  {t('inclusionDiversity')}
                </h3>
                <p className="text-gray-700">
                  {t('inclusionDiversityDesc')}
                </p>
              </div>
            </div>

            {/* Integrity */}
            <div className="flex items-center gap-4">
              <div className="w-30 h-30 flex-shrink-0">
                <Image
                  src="/images/about-04.webp"
                  alt="Temu Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-2">
                  {t('integrity')}
                </h3>
                <p className="text-gray-700">
                  {t('integrityDesc')}
                </p>
              </div>
            </div>

            {/* Socially responsible */}
            <div className="flex items-center gap-4">
              <div className="w-30 h-30 flex-shrink-0">
                <Image
                  src="/images/about-05.webp"
                  alt="Temu Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-2">
                  {t('sociallyResponsible')}
                </h3>
                <p className="text-gray-700">
                  {t('sociallyResponsibleDesc')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
