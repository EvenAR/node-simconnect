export enum Protocol {
    /**
     * FSX original release
     */
    FSX_RTM = 0x2,
    /**
     * FSX SP1, supports enhanced client data, facilites, and modeless ui
     */
    FSX_SP1 = 0x3,
    /**
     * FSX SP2/Acceleration, racing and another flight save
     */
    FSX_SP2 = 0x4,
}

module.exports = {
    Protocol,
};
