// src/components/TimelineGallery.tsx
import React, { useState } from 'react';

export interface MediaItem {
    type: 'youtube' | 'image';
    src: string;      // youtube id or image url
    title?: string;
}

export interface TimelineItem {
    id: string;
    period: string;
    title: string;
    subtitle?: string;
    description?: string;
    place?: string
    media?: MediaItem;
}

interface Props {
    items: TimelineItem[];
    initialId?: string;
}

export const TimelineGallery: React.FC<Props> = ({ items, initialId }) => {
    const [selectedId, setSelectedId] = useState(
        initialId ?? (items.length > 0 ? items[0].id : '')
    );
    const selected =
        items.find((item) => item.id === selectedId) ?? items[0] ?? null;
    if (!selected) return null;

    const renderMedia = (media?: MediaItem) => {
        if (!media) return null;
        if (media.type === 'youtube') {
            return (
                <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${media.src}`}
                        title={media.title ?? 'Project demo'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            );
        }
        // image
        return (
            <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-neutral-900">
                <img
                    src={media.src}
                    alt={media.title ?? 'Project screenshot'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
        );
    };

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-10 md:py-16">
            {/* 상단 - 대표 미디어 */}
            <div className="mb-8 md:mb-12">
                <div className="mb-4">
                    {renderMedia(selected.media)}
                </div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                    <div>
                        <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-neutral-500 mb-1">
                            {selected.period}
                        </p>
                        <p className="text-2xl md:text-3xl font-extrabold mb-1">
                            {selected.title}
                        </p>
                        {selected.subtitle && (
                            <p className="text-sm md:text-base text-neutral-400">
                                {selected.subtitle}
                            </p>
                        )}
                    </div>
                    <p className="text-xs md:text-sm text-neutral-500 max-w-md">
                        {selected.place ??
                            'Toy project'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 md:gap-12">
                {/* 데스크탑: 좌측 타임라인 / 모바일: 맨 아래에 간소화된 타임라인*/}
                <aside className="hidden md:block md:border-r md:border-neutral-800 md:pr-8">
                    <ol className="relative border-l border-neutral-700 pl-4 md:pl-8">
                        {items.map((item) => {
                            const active = item.id === selected.id;
                            return (
                                <li key={item.id} className="mb-8 last:mb-0 relative">
                                    <div className="absolute -left-2.5 md:-left-6 top-1.5">
                                        <div
                                            className={[
                                                'w-3 h-3 rounded-full border border-neutral-500 bg-neutral-900',
                                                active
                                                    ? 'bg-yellow-300 border-emerald-300 shadow-[0_0_0_4px_rgba(185,129,29,0.25)]'
                                                    : '',
                                            ].join(' ')}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedId(item.id)}
                                        className={[
                                            'text-left w-full group cursor-pointer',
                                            active
                                                ? 'opacity-100'
                                                : 'opacity-70 hover:opacity-100 transition-opacity',
                                        ].join(' ')}
                                    >
                                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-1">
                                            {item.period}
                                        </p>
                                        <p
                                            className={[
                                                'text-sm font-semibold',
                                                active
                                                    ? 'text-yellow-600 dark:text-yellow-400'
                                                    : 'text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-50',
                                            ].join(' ')}
                                        >
                                            {item.title}
                                        </p>
                                        {item.subtitle && (
                                            <p className="text-xs text-neutral-400 mt-0.5">
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </aside>

                {/* 우측 / 모바일 상단: 관련 포스트 카드들 */}
                <section>
                    <p className="text-lg md:text-2xl font-semibold mb-4">
                        Overview
                    </p>

                    <p className="text-text-black dark:text-white text-base md:text-lg">
                        {selected.description}
                    </p>

                    {/* 모바일용 타임라인 탭 */}
                    <div className="mt-8 md:hidden border-t border-neutral-800 pt-4">
                        <p className="text-xs text-white mb-3">Timeline</p>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {items.map((item) => {
                                const active = item.id === selected.id;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setSelectedId(item.id)}
                                        className={[
                                            'shrink-0 px-3 py-2 rounded-full text-base font-semibold border',
                                            active
                                                ? 'bg-yellow-400 text-black border-yellow-200'
                                                : 'bg-neutral-950 text-neutral-300 border-neutral-700',
                                        ].join(' ')}
                                    >
                                        <span className="block text-[11px]">
                                            {item.title}
                                        </span>
                                        <span className="block text-[10px] uppercase tracking-[0.15em]">
                                            {item.period}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};
