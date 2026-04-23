import styles from "./CourseInformation.module.css";
import Image from "next/image";

const CourseInformationBox = () => {
return (
    <div>
        <div className={styles["totalcourse"]}>
            <div className="upper1">
                <Image src="/icons/Open Book.svg" alt="Open Book icon" width={20} height={20} />
            </div>
            <h1>Total Course</h1>
        </div>

        <div className={styles["coursecompleted"]}>
            <div className="upper2">
                <Image src="/icons/Paper.svg" alt="Paper icon" width={20} height={20} />
            </div>
            <h3>Course Completed</h3>
        </div>

        <div className={styles["courseinprogress"]}>
            <div className="upper3">
                <Image src="/icons/icon-courseinprogress.svg" alt="In Progress icon" width={20} height={20} />
            </div>
            <h3>Course In Progress</h3>
        </div>

        <div className={styles["completedlivecourses"]}>
            <div className="upper4">
                <Image src="/icons/Group 1.svg" alt="Play Button icon" width={20} height={20} />
            </div>
            <h3>Upcoming Live Courses</h3>
        </div>
    </div>
    );
};

export default CourseInformationBox