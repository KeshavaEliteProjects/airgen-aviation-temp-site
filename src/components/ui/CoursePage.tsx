import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { useMemo } from "react";
import { useFlight } from "../../context/FlightContext";
import { ASK_FRAMEWORK, COURSES, INCLUDED_FEATURES } from "../../lib/content";

interface CoursePageProps {
  courseId: string;
  onBack: () => void;
}

export function CoursePage({ courseId, onBack }: CoursePageProps) {
  const { setEnquiryModalOpen } = useFlight();
  const course = useMemo(() => COURSES.find((item) => item.id === courseId) ?? COURSES[0], [courseId]);

  return (
    <main className="course-page-v18">
      <div className="course-page-v18-shell">
        <button className="course-back focus-ring" onClick={onBack}><ArrowLeft size={15} /> Back to AirGen</button>

        <header className="course-page-v18-hero">
          <div>
            <div className="eyebrow"><span /> {course.regulator} / {course.region}</div>
            <div className="course-page-v18-number">{course.id.toUpperCase()}</div>
            <h1>{course.tagline}</h1>
            <p>{course.description}</p>
            <div className="course-page-v18-actions">
              <button className="primary-button focus-ring" onClick={() => setEnquiryModalOpen(true)}>Enquire about this pathway <ArrowUpRight size={15} /></button>
              <button className="secondary-button focus-ring" onClick={onBack}>Explore all pathways</button>
            </div>
          </div>
          <div className="course-page-v18-visual">
            <div className="course-page-v18-visual-label">AIRGEN / {course.regulator}</div>
            <div className="course-page-v18-visual-code">{course.regulator}</div>
            <div className="course-page-v18-visual-rule" />
          </div>
        </header>

        <section className="course-page-v18-body">
          <div>
            <div className="eyebrow"><span /> Pathway coverage</div>
            <h2>What the <strong>pathway covers.</strong></h2>
          </div>
          <div className="course-page-v18-highlights">
            {course.highlights.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="course-page-v18-ask">
          <div>
            <div className="eyebrow"><span /> ASK @ AirGen</div>
            <h2>Training is more than <strong>subject recall.</strong></h2>
            <p>{ASK_FRAMEWORK.line}</p>
          </div>
          <div className="course-page-v18-ask-grid">
            {ASK_FRAMEWORK.axes.map((axis) => (
              <div key={axis.key}>
                <span>{axis.key}</span>
                <strong>{axis.title}</strong>
                <p>{axis.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="course-page-v18-included">
          <div className="eyebrow"><span /> Included support</div>
          <h2>The same support layer<br /><strong>across every pathway.</strong></h2>
          <div className="course-page-v18-included-grid">
            {INCLUDED_FEATURES.map((item) => (
              <div key={item}><Check size={14} /> {item}</div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
