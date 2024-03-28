import React, { useState } from "react";

class MRUPageReplacement {
    constructor(frames) {
        this.frames = frames;
        this.pageQueue = []; // Queue to store the pages in memory
        this.loadedPages = []; // List to store pages currently loaded into memory
        this.lastHitOrRemovedPage = null; // Last hit or removed page
    }

    accessPage(page) {
        // Check if page is already in memory
        const pageIndex = this.pageQueue.indexOf(page);

        if (pageIndex !== -1) {
            // If page is already in memory, move it to the front (most recently used)
            this.pageQueue.splice(pageIndex, 1);
            this.pageQueue.unshift(page);
            this.lastHitOrRemovedPage = page; // Update last hit or removed page
            return { page: page, action: "PAGE HITTED" }; // Page hit
        } else {
            // If page is not in memory, check if memory is full
            if (this.pageQueue.length < this.frames) {
                // If there's still space in memory, simply add the page to the front
                this.pageQueue.unshift(page);
                this.loadedPages = this.pageQueue.slice(); // Update loaded pages list
                return { page: page, action: "PAGE LOADED" }; // Page loaded
            } else {
                // If memory is full, remove the most recently used page (front of the queue)
                const removedPage = this.pageQueue.shift();
                // Add the new page to the front
                this.pageQueue.unshift(page);
                this.loadedPages = this.pageQueue.slice(); // Update loaded pages list
                this.lastHitOrRemovedPage = removedPage; // Update last hit or removed page
                return { page: page, action: "PAGE FAULT" }; // Page fault
            }
        }
    }

    getLastHitOrRemovedPage() {
        return this.lastHitOrRemovedPage;
    }

    getLoadedPages() {
        return this.loadedPages;
    }
}

const PageReplacement = () => {
    const [frames, setFrames] = useState(3);
    const [pageInput, setPageInput] = useState("");
    const [result, setResult] = useState([]);
    const [mru, setMru] = useState(null);

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const mruInstance = new MRUPageReplacement(frames);
        setMru(mruInstance);

        const pages = pageInput.split(",").map(Number);
        let output = [];

        pages.forEach(page => {
            const result = mruInstance.accessPage(page);
            output.push({ page: mruInstance.getLoadedPages().join(", "), action: result.action, lastHitOrRemovedPage: mruInstance.getLastHitOrRemovedPage() });
        });

        setResult(output);
    };

    return (
        <div className="min-h-screen h-[90%] w-[100%] flex flex-col items-center justify-center bg-sky-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">MRU Page Replacement Algorithm Simulator</h2>
                <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4 items-center">
                    <div className="flex items-center gap-4">
                        <label>Number of Frames:</label>
                        <input type="number" value={frames} onChange={(event) => handleInputChange(event, setFrames)} className="border border-gray-300 rounded-md px-2 py-1" />
                    </div>
                    <div className="flex items-center gap-4">
                        <label>Pages (comma-separated):</label>
                        <input type="text" value={pageInput} onChange={(event) => handleInputChange(event, setPageInput)} className="border border-gray-300 rounded-md px-2 py-1" />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-md shadow-md transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Simulate MRU Algorithm</button>
                </form>
                {result.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Results</h3>
                        <table className="border border-collapse rounded-md mx-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Page</th>
                                    <th className="border px-4 py-2">Action</th>
                                    <th className="border px-4 py-2">Last Hit/Removed Page</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((line, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{line.page}</td>
                                        <td className="border px-4 py-2">{line.action}</td>
                                        <td className="border px-4 py-2">{line.lastHitOrRemovedPage || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageReplacement;

