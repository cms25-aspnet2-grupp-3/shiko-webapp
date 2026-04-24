import styles from "./CourseInformation.module.css";
import Image from "next/image";

const CourseInformationBox = () => {
return (
    <div className={`grid grid-cols-2 place-self-start gap-8`} >
        <section className={styles["totalcourse"]}>
            <div>
                <div className="flex flex-row items-center gap-2">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/Open Book.svg" alt="Open Book icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-4xl">100</div>
                </div>
                <p className="font-bold text-lg">Total Course</p>
                <a className="row-start-3">view details placeholder</a>
            </div>
        </section>

        <section className={styles["coursecomplete"]}>
            <div>
                <div className="flex flex-row items-center gap-2">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/Paper.svg" alt="Paper icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-4xl">21</div>
                </div>
                <p className="font-bold text-lg">Course Complete</p>
                <a className="row-start-3">view details placeholder</a>
            </div>
        </section>

        <section className={styles["courseinprogress"]}>
            <div>
                <div className="flex flex-row items-center gap-2">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/icon-courseinprogress.svg" alt="In Progress icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-4xl">??</div>
                </div>
                <p className="font-bold text-lg">Course In Progress</p>
                <a className="row-start-3">view details placeholder</a>
            </div>
        </section>

        <section className={styles["completedlivecourses"]}>
            <div>
                <div className="flex flex-row items-center gap-2">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/Group 1.svg" alt="Play Button icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-4xl">0</div>
                </div>
                <p className="font-bold text-lg">Upcoming Live Courses</p>
                <a className="row-start-3">view details placeholder</a>
            </div>
        </section>
    </div>
    );
};

export default CourseInformationBox