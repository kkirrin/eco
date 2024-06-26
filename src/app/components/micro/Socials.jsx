import {useGetSocialQuery} from "@/redux/api/socials.api";
import React, {useEffect} from "react";
import styles from "@/app/css/footer.module.css";

function Socials ({}) {

    const {isLoading, error, data} = useGetSocialQuery();

    useEffect(() => {
        ////console.log(data)
    },[isLoading])

    return(
        <div className={styles.socialRow}>
            {
                (!isLoading) ?
                    (typeof data != 'undefined' &&  data.data && Array.isArray(data.data) && data.data[0].attributes.telegram) ?
                        <div className={styles.oneSocial}>
                            <a target = "_blank" href={`${data.data[0].attributes.telegram}`}>
                                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 19 17" fill="#262626">
                                    <path d="M7.61686 11.0053L7.32737 15.4027C7.74155 15.4027 7.92093 15.2105 8.13604 14.9798L10.0779 12.9756L14.1015 16.1579C14.8394 16.602 15.3593 16.3682 15.5584 15.4247L18.1995 2.05935L18.2002 2.05856C18.4343 0.880468 17.8057 0.419783 17.0868 0.708794L1.56244 7.12767C0.502936 7.57182 0.518978 8.20969 1.38233 8.4987L5.35128 9.83193L14.5704 3.60205C15.0042 3.29178 15.3987 3.46345 15.0742 3.77373L7.61686 11.0053Z" fill="#262626"/>
                                </svg>
                            </a>
                        </div>
                        : null
                    : null
            }
            {
                (!isLoading) ?
                    (typeof data != 'undefined' &&  data.data && Array.isArray(data.data) && data.data[0].attributes.vk) ?
                        <div className={styles.oneSocial}>
                            <a target = "_blank" href={`${data.data[0].attributes.vk}`}>
                                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 21 13" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20.3148 1.31257C20.4571 0.844571 20.3148 0.5 19.6334 0.5H17.3834C16.8108 0.5 16.5468 0.797428 16.4037 1.12571C16.4037 1.12571 15.2594 3.86514 13.6385 5.64457C13.114 6.16057 12.8757 6.32428 12.5894 6.32428C12.4463 6.32428 12.2311 6.16057 12.2311 5.69171V1.31257C12.2311 0.750285 12.0734 0.5 11.5968 0.5H8.05855C7.70112 0.5 7.48598 0.760571 7.48598 1.00829C7.48598 1.54057 8.29683 1.664 8.37998 3.16228V6.41771C8.37998 7.13171 8.24883 7.26114 7.96255 7.26114C7.19969 7.26114 5.34398 4.50885 4.24255 1.35971C4.02913 0.746857 3.81313 0.5 3.23798 0.5H0.986272C0.343415 0.5 0.214844 0.797428 0.214844 1.12571C0.214844 1.71028 0.9777 4.61428 3.7677 8.45514C5.6277 11.078 8.24626 12.5 10.6317 12.5C12.0623 12.5 12.2388 12.1846 12.2388 11.6403V9.65771C12.2388 9.02599 12.3743 8.89999 12.8277 8.89999C13.162 8.89999 13.7337 9.06456 15.0691 10.3288C16.5948 11.828 16.846 12.5 17.7048 12.5H19.9548C20.5977 12.5 20.92 12.1846 20.7348 11.5606C20.5308 10.94 19.8023 10.0391 18.8363 8.97028C18.3117 8.36171 17.5248 7.70599 17.2857 7.37771C16.9523 6.95685 17.0474 6.76914 17.2857 6.39457C17.2857 6.39457 20.0285 2.60086 20.314 1.31257H20.3148Z" fill="#262626"/>
                                </svg>
                            </a>
                        </div>
                        : null
                    : null
            }
            {
                (!isLoading) ?
                    (typeof data != 'undefined' &&  data.data && Array.isArray(data.data) && data.data[0].attributes.instagram) ?
                        <div className={styles.oneSocial}>
                            <a target = "_blank" href={`${data.data[0].attributes.instagram}`}>
                                <svg xmlns="https://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                    <path d="M13.4895 5.18018C13.3077 5.18018 13.1598 5.3281 13.1598 5.50986C13.1598 5.69163 13.3077 5.83955 13.4895 5.83955C13.6712 5.83955 13.8191 5.69165 13.8191 5.50986C13.8191 5.32807 13.6712 5.18018 13.4895 5.18018ZM9.54193 6.5346C7.93031 6.5346 6.61914 7.84575 6.61914 9.45737C6.61914 11.069 7.93031 12.3802 9.54193 12.3802C11.1536 12.3802 12.4647 11.069 12.4647 9.4574C12.4647 7.84578 11.1536 6.5346 9.54193 6.5346Z" fill="#262626"/>
                                    <path d="M13.5656 0.5H5.43443C2.71358 0.5 0.5 2.71358 0.5 5.43446V13.5656C0.5 16.2865 2.71358 18.5 5.43443 18.5H13.5656C16.2865 18.5 18.5 16.2864 18.5 13.5656V5.43446C18.5 2.71358 16.2865 0.5 13.5656 0.5ZM9.5 14.4371C6.77768 14.4371 4.56297 12.2223 4.56297 9.5C4.56297 6.77768 6.77771 4.56301 9.5 4.56301C12.2223 4.56301 14.4371 6.77771 14.4371 9.5C14.4371 12.2223 12.2223 14.4371 9.5 14.4371ZM14.7323 5.76767C13.9053 5.76767 13.2324 5.09478 13.2324 4.2677C13.2324 3.44061 13.9053 2.76768 14.7323 2.76768C15.5594 2.76768 16.2323 3.44057 16.2323 4.26766C16.2323 5.09475 15.5594 5.76767 14.7323 5.76767Z" fill="#262626"/>
                                </svg>
                            </a>
                        </div>
                        : null
                    : null
            }
            {
                (!isLoading) ?
                    (typeof data != 'undefined' &&  data.data && Array.isArray(data.data) && data.data[0].attributes.youtube) ?
                        <div className={styles.oneSocial}>
                            <a className = {styles.youTubeIcon} target = "_blank" href={`${data.data[0].attributes.youtube}`}>
                                <svg viewBox="0 0 35 35" fill="none" xmlns="https://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_964_177)">
                                        <path d="M0 17.5C0 7.83504 7.83504 0 17.5 0C27.165 0 35 7.83504 35 17.5C35 27.165 27.165 35 17.5 35C7.83504 35 0 27.165 0 17.5Z" fill="#FECC00"/>
                                        <path d="M26.4431 13.1784C26.2284 12.3537 25.5958 11.7043 24.7927 11.4839C23.3371 11.0834 17.4998 11.0834 17.4998 11.0834C17.4998 11.0834 11.6626 11.0834 10.2069 11.4839C9.40368 11.7043 8.77113 12.3537 8.55646 13.1784C8.1665 14.6731 8.1665 17.7917 8.1665 17.7917C8.1665 17.7917 8.1665 20.9102 8.55646 22.405C8.77113 23.2297 9.40368 23.8791 10.2069 24.0996C11.6626 24.5 17.4998 24.5 17.4998 24.5C17.4998 24.5 23.3371 24.5 24.7927 24.0996C25.5958 23.8791 26.2284 23.2297 26.4431 22.405C26.8332 20.9102 26.8332 17.7917 26.8332 17.7917C26.8332 17.7917 26.8332 14.6731 26.4431 13.1784Z" fill="#262626"/>
                                        <path d="M15.75 21V15.1666L20.4167 18.0834L15.75 21Z" fill="#FECC00"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_964_177">
                                            <rect width="35" height="35" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>

                            </a>
                        </div>
                        : null
                    : null
            }
        </div>
    )
}

export default Socials;
