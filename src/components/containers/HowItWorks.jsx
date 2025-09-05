import React from 'react';
import Image from 'next/image';

const HowItWorks = ({ data }) => {
    if (!data) return null;

    const { subtitle, title, steps, image } = data;

    return (
        <section className="section how-it-works-section" style={{ backgroundColor: '#fff5f5', padding: '100px 0' }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-6">
                        <div className="how-it-works-content">
                            <div className="section__header mb-4">
                                <span className="sub-title" style={{ color: '#ff6c26', textTransform: 'uppercase', fontWeight: '600' }}>{subtitle || 'HOW WE WORKS'}</span>
                                <h2 className="title" style={{ fontSize: '40px' }}>{title || 'How It Works'}</h2>
                            </div>
                            <ul className="how-it-works-steps" style={{ listStyle: 'none', paddingLeft: '0' }}>
                                {steps && steps.map((step, index) => (
                                    <li key={index} className="step-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                                        <div className="step-number-wrapper" style={{ marginRight: '24px' }}>
                                            <span className="step-number" style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                backgroundColor: ['#ffedeb', '#e6f4ff', '#fffbeb'][index % 3],
                                                color: ['#ff6c26', '#4569e7', '#ffc700'][index % 3],
                                                fontSize: '20px',
                                                fontWeight: '600'
                                            }}>{String(index + 1).padStart(2, '0')}</span>
                                        </div>
                                        <p className="step-text" style={{ margin: 0, fontSize: '18px' }}>{step}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="how-it-works-image" style={{ textAlign: 'center' }}>
                            {image?.url && (
                                <Image
                                    src={image.url}
                                    alt={title || "How it works"}
                                    width={617}
                                    height={402}
                                    style={{ borderRadius: '12px' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
