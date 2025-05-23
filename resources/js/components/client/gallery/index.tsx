import CustomDropdown from '@/components/custom-dropdown';
import { useEffect, useRef, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './index.css';

export default function Images() {
    const [selectedYear, setSelectedYear] = useState<number>(2023);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const options = [
        { value: '2023', label: '#SFF2023' },
        { value: '2024', label: '#SFF2024' },
        { value: '2025', label: '#SFF2025' },
    ];

    type Image = {
        title: string | null;
        url: string;
    };

    const imagesByYear: Record<number, Image[]> = {
        2023: [
            { title: 'Image 1', url: '1.jpg' },
            { title: 'Image 2', url: '2.jpg' },
            { title: 'Image 3', url: '3.jpg' },
            { title: 'Image 4', url: '4.jpg' },
            { title: null, url: '5.jpg' },
            { title: null, url: '7.jpg' },
            { title: null, url: '8.jpg' },
            { title: null, url: '9.jpg' },
            { title: null, url: '10.jpg' },
        ],
        2024: [
            { title: 'Image 1', url: '3.jpg' },
            { title: null, url: '5.jpg' },
            { title: null, url: '7.jpg' },
            { title: null, url: '8.jpg' },
            { title: null, url: '9.jpg' },
            { title: null, url: '10.jpg' },
        ],
        2025: [{ title: 'Image 2', url: '2.jpg' }],
    };

    const images = imagesByYear[selectedYear] || [];

    const handleSelect = (option: { value: string; label: string } | null) => {
        setSelectedYear(Number(option?.value));
    };

    function resetAnimation(el: HTMLElement | null) {
        if (!el) return;
        el.classList.remove('fade-in');
        void el.offsetWidth;
        el.classList.add('fade-in');
    }

    useEffect(() => {
        imageRefs.current.forEach((el) => resetAnimation(el));
    }, [selectedYear]);

    return (
        <section className="mb-22">
            <div className="container">
                <div className="mb-6 flex flex-col items-center justify-between lg:flex-row">
                    <h1 className="section-title !mb-0">GALLERY</h1>
                    <div>
                        <CustomDropdown options={options} defaultValue={options[0]} onChange={handleSelect} />
                    </div>
                </div>
                <ResponsiveMasonry columnsCountBreakPoints={{ 0: 2, 1023: 3 }}>
                    <Masonry gutter="10px" className="bg-primary rounded-md p-2">
                        {images.map((image, i) => (
                            <img
                                key={i}
                                ref={(el) => {
                                    imageRefs.current[i] = el;
                                }}
                                src={`/images/gallery/${selectedYear}/${image.url}`}
                                className="fade-in block w-full cursor-pointer rounded-md"
                                alt={image.title ?? ''}
                                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
                                onClick={() => setLightboxIndex(i)}
                            />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
                {lightboxIndex !== null && (
                    <Lightbox
                        open={lightboxIndex !== null}
                        index={lightboxIndex}
                        close={() => setLightboxIndex(null)}
                        slides={images.map((img) => ({
                            src: `/images/gallery/${selectedYear}/${img.url}`,
                            alt: img.title ?? '',
                        }))}
                    />
                )}
            </div>
        </section>
    );
}
