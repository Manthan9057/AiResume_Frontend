import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='home-page'>

            {/* Header */}
            <header className='page-header'>
                <h1>
                    Create Your Custom <span className='highlight'>Interview Plan</span>
                </h1>
                <p className='subtitle'>
                    Analyze job requirements and your profile to generate a focused interview strategy.
                </p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel */}
                    <div className='panel'>
                        <div className='panel__header'>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>

                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className='panel__textarea'
                            placeholder={`Paste the full job description...\n\ne.g. React, TypeScript, system design`}
                            maxLength={5000}
                        />

                        <div className='char-counter'>
                            {jobDescription.length} / 5000
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel */}
                    <div className='panel'>

                        <div className='panel__header'>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload */}
                       <div className='upload-section'>
    <label className='section-label'>
        Upload Resume
        <span className='badge badge--best'>Recommended</span>
    </label>

    <label className='dropzone' htmlFor='resume'>

        <input
            ref={resumeInputRef}
            type='file'
            id='resume'
            name='resume'
            accept='.pdf,.docx'
            hidden
        />

        <div className='dropzone__content'>
            <div className='dropzone__icon'>📄</div>

            <p className='dropzone__title'>
                {resumeInputRef.current?.files?.[0]
                    ? resumeInputRef.current.files[0].name
                    : "Click to upload your resume"}
            </p>

            <p className='dropzone__subtitle'>
                PDF or DOCX • Max 5MB
            </p>
        </div>
    </label>
</div>

                        {/* OR */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Self Description */}
                        <div className='self-description'>
                            <label className='section-label'>
                                Quick Self-Description
                            </label>

                            <textarea
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your skills and experience..."
                            />
                        </div>

                        {/* Info */}
                        <div className='info-box'>
                            <p>
                                Provide either a <strong>Resume</strong> or a <strong>Self Description</strong>.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>
                        AI-powered • Takes ~30 seconds
                    </span>

                    <button
                        onClick={handleGenerateReport}
                        className='generate-btn'
                    >
                        ✨ Generate Interview Plan
                    </button>
                </div>
            </div>

            {/* Recent Reports */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>Recent Plans</h2>

                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li
                                key={report._id}
                                className='report-item'
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >
                                <div className='report-item__top'>
                                    <h3>{report.title || 'Untitled Position'}</h3>

                                    <span className={`score-badge ${
                                        report.matchScore >= 80 ? 'high' :
                                        report.matchScore >= 60 ? 'mid' : 'low'
                                    }`}>
                                        {report.matchScore}%
                                    </span>
                                </div>

                                <p className='report-meta'>
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy</a>
                <a href='#'>Terms</a>
                <a href='#'>Help</a>
            </footer>
        </div>
    )
}

export default Home