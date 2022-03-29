export interface ActivitiesDTO {
    teamId: number;
    blockId: number;
    activityName: string;
    activityPlace: string;
    fromDate: string | null;
    toDate: string | null;
    activityDetails: string;
    createdBy: string;
}

export interface MdactivityImage {
    mdimageId: number;
    activityId: number | null;
    image: string;
    isActive: boolean | null;
    createdBy: number | null;
    createDate: string | null;
    modifiedBy: number | null;
    modifiedDate: string | null;
}