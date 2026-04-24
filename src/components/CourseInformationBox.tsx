import styles from "./CourseInformation.module.css";
import Image from "next/image";

const CourseInformationBox = () => {
return (
    <div className="grid grid-cols-2 place-self-start space-x-8" >
        <section className={styles["totalcourse"]}>
            <div className="informationicon">
                <Image src="/icons/Open Book.svg" alt="Open Book icon" width={20} height={20} />
            </div>
            <p>Total Course</p>
        </section>

        <section className={styles["coursecompleted"]}>
            <div className="informationicon">
                <Image src="/icons/Paper.svg" alt="Paper icon" width={20} height={20} />
            </div>
            <p>Course Completed</p>
        </section>

        <section className={styles["courseinprogress"]}>
            <div className="informationicon">
                <Image src="/icons/icon-courseinprogress.svg" alt="In Progress icon" width={20} height={20} />
            </div>
            <p>Course In Progress</p>
        </section>

        <section className={styles["completedlivecourses"]}>
            <div className="informationicon">
                <Image src="/icons/Group 1.svg" alt="Play Button icon" width={20} height={20} />
            </div>
            <p>Upcoming Live Courses</p>
        </section>
    </div>
    );
};

export default CourseInformationBox