import styles from "./CourseInformation.module.css";
import Image from "next/image";

const CourseInformationBox = () => {
return (
    <div className={`flex grid grid-cols-2 gap-7.5`} >
        <section className={styles["totalcourse"]}>
            <div>
                <div className="flex flex-row items-center gap-2">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/Open Book.svg" alt="Open Book icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-5xl">100</div>
                </div>
                <p className="font-semibold text-xl pt-2">Total Course</p>
                <button className="flex flex-row items-center gap-2 pt-1">
                    <a className="underline text-base font-medium" href="">View Details</a>
                    <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
                </button>
            </div>
        </section>

        <section className={styles["coursecomplete"]}>
            <div>
                <div className="flex flex-row items-center gap-2">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/Paper.svg" alt="Paper icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-5xl">21</div>
                </div>
                <p className="font-semibold text-xl pt-2">Course Complete</p>
                <button className="flex flex-row items-center gap-2 pt-1">
                    <a className="underline text-base font-medium" href="">View Details</a>
                    <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
                </button>
            </div>
        </section>

        <section className={styles["courseinprogress"]}>
            <div>
                <div className="flex flex-row items-center gap-2">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/icon-courseinprogress.svg" alt="In Progress icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-5xl">??</div>
                </div>
                <p className="font-semibold text-xl pt-2">Course In Progress</p>
                <button className="flex flex-row items-center gap-2 pt-1">
                    <a className="underline text-base font-medium" href="">View Details</a>
                    <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
                </button>
            </div>
        </section>

        <section className={styles["completedlivecourses"]}>
            <div>
                <div className="flex flex-row items-center gap-2">
                    <div className={styles["informationicon"]}>
                        <Image src="/icons/Group 1.svg" alt="Play Button icon" width={20} height={20} />
                    </div>
                    <div className="font-bold text-5xl">0</div>
                </div>
                <p className="font-semibold text-xl pt-2">Upcoming Live Courses</p>
                <button className="flex flex-row items-center gap-2 pt-1">
                    <a className="underline text-base font-medium" href="">View Details</a>
                    <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
                </button>
            </div>
        </section>
    </div>
    );
};

export default CourseInformationBox