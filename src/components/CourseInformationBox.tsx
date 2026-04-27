import styles from "./CourseInformation.module.css";
import Image from "next/image";

const CourseInformationBox = () => {
return (
    <div className={`grid grid-cols-2 place-self-start gap-8`} >
        <section className={styles["totalcourse"]}>
            <div>
                <div className="flex flex-row items-center gap-2 pt-1">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/Open Book.svg" alt="Open Book icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-5xl">100</div>
                </div>
                <p className="font-bold text-lg pt-2">Total Course</p>
                <div className="flex flex-row items-center gap-2 pt-1">
                    <a className="row-start-3 underline text-sm font-medium" href="">View Details</a>
                    <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
                </div>
            </div>
        </section>

        <section className={styles["coursecomplete"]}>
            <div>
                <div className="flex flex-row items-center gap-2 pt-1">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/Paper.svg" alt="Paper icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-5xl">21</div>
                </div>
                <p className="font-bold text-lg pt-2">Course Complete</p>
                <div className="flex flex-row items-center gap-2 pt-1">
                    <a className="row-start-3 underline text-sm font-medium" href="">View Details</a>
                    <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
                </div>
            </div>
        </section>

        <section className={styles["courseinprogress"]}>
            <div>
                <div className="flex flex-row items-center gap-2 pt-1">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/icon-courseinprogress.svg" alt="In Progress icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-5xl">??</div>
                </div>
                <p className="font-bold text-lg pt-2">Course In Progress</p>
                <div className="flex flex-row items-center gap-2 pt-1">
                    <a className="row-start-3 underline text-sm font-medium" href="">View Details</a>
                    <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
                </div>
            </div>
        </section>

        <section className={styles["completedlivecourses"]}>
            <div>
                <div className="flex flex-row items-center gap-2 pt-1">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/Group 1.svg" alt="Play Button icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-5xl">0</div>
                </div>
                <p className="font-bold text-lg pt-2">Upcoming Live Courses</p>
                <div className="flex flex-row items-center gap-2 pt-1">
                    <a className="row-start-3 underline text-sm font-medium" href="">View Details</a>
                    <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
                </div>
            </div>
        </section>
    </div>
    );
};

export default CourseInformationBox