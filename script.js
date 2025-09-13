// Chart configuration based on provided reference points
const CHART_CONFIG = {
    // Weight reference points: (age 2, 5kg) = (236, 3307), (age 19, 90kg) = (2244.5, 1453.5)
    ageRef1: 2,
    weightRef1: 5,
    weightXRef1: 236,
    weightYRef1: 3307,
    
    ageRef2: 19,
    weightRef2: 90,
    weightXRef2: 2244.5,
    weightYRef2: 1453.5,
    
    // Height reference points: (age 2, 85cm) = (236, 2762), (age 19, 190cm) = (2244.5, 472.5)
    heightRef1: 85,
    heightXRef1: 236,
    heightYRef1: 2762,
    
    heightRef2: 190,
    heightXRef2: 2244.5,
    heightYRef2: 472.5
};

class GrowthChartPlotter {
    constructor() {
        this.canvas = document.getElementById('chartCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.chartImage = new Image();
        this.plotPoints = [];
        this.showCurves = true;
        this.calibrationManager = null;
        
        this.initializeChart();
        this.setupEventListeners();
        this.preloadExampleData();
    }
    
    initializeChart() {
        this.chartImage.onload = async () => {
            // Set the actual canvas size to the image dimensions
            this.originalWidth = this.chartImage.width;
            this.originalHeight = this.chartImage.height;
            
            this.resizeCanvas();
            this.drawChart();
            
            console.log('Chart loaded successfully!');
            
            // Update status
            document.getElementById('analysisStatus').innerHTML = 
                '✅ Chart loaded! Magnetic curves will load automatically.';
            
            // Add resize listener for responsive behavior
            window.addEventListener('resize', () => {
                this.resizeCanvas();
                this.drawChart();
            });
        };
        
        this.chartImage.onerror = () => {
            console.error('Failed to load chart image');
            // Create a fallback canvas
            this.originalWidth = 2500;
            this.originalHeight = 3500;
            this.resizeCanvas();
            this.drawFallbackChart();
        };
        
        this.chartImage.src = 'Weight-and-height_Boys_2-19-years.png';
    }
    
    resizeCanvas() {
        const container = document.getElementById('chartContainer');
        const maxWidth = container.parentElement.clientWidth - 40; // Account for padding
        const maxHeight = window.innerHeight * 0.8; // Max 80% of viewport height
        
        // Calculate scale to fit within container while maintaining aspect ratio
        const scaleX = maxWidth / this.originalWidth;
        const scaleY = maxHeight / this.originalHeight;
        this.scale = Math.min(scaleX, scaleY, 1); // Never scale up beyond original size
        
        this.canvas.width = this.originalWidth;
        this.canvas.height = this.originalHeight;
        this.canvas.style.width = (this.originalWidth * this.scale) + 'px';
        this.canvas.style.height = (this.originalHeight * this.scale) + 'px';
    }
    
    drawChart() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.chartImage, 0, 0);
        
        // Draw magnetic curves if available and curves are enabled
        if (this.calibrationManager && this.calibrationManager.fittedCurves && this.showCurves) {
            this.drawMagneticCurves();
        }
        
        this.drawPlotPoints();
    }
    
    drawMagneticCurves() {
        // Draw the magnetic curves on the chart
        const curves = this.calibrationManager.fittedCurves;
        
        // Colors for different percentiles
        const percentileColors = {
            'P3': '#800080',   // Purple
            'P10': '#ff00ff',  // Magenta
            'P25': '#00ffff',  // Cyan
            'P50': '#00ff00',  // Green
            'P75': '#ffff00',  // Yellow
            'P90': '#ffa500',  // Orange
            'P97': '#ff0000'   // Red
        };
        
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.8;
        
        for (const [curveId, curveData] of Object.entries(curves)) {
            if (curveData.method === 'magnetic_tracing' && curveData.points && curveData.points.length > 1) {
                const percentile = curveData.percentile;
                const color = percentileColors[percentile] || '#888888';
                
                this.ctx.strokeStyle = color;
                this.ctx.beginPath();
                
                // Draw the curve
                const firstPoint = curveData.points[0];
                this.ctx.moveTo(firstPoint.x, firstPoint.y);
                
                for (let i = 1; i < curveData.points.length; i++) {
                    const point = curveData.points[i];
                    this.ctx.lineTo(point.x, point.y);
                }
                
                this.ctx.stroke();
                
                // Add label for the curve
                if (curveData.points.length > 10) {
                    const labelPoint = curveData.points[Math.floor(curveData.points.length / 4)];
                    this.ctx.fillStyle = color;
                    this.ctx.font = 'bold 14px Arial';
                    this.ctx.fillText(percentile, labelPoint.x + 5, labelPoint.y - 5);
                }
            }
        }
        
        this.ctx.globalAlpha = 1.0;
    }
    
    drawFallbackChart() {
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(200, 400, 2100, 2800);
        
        this.ctx.fillStyle = '#333';
        this.ctx.font = '20px Arial';
        this.ctx.fillText('Boys Growth Chart (2-19 years)', 800, 100);
        this.ctx.fillText('Chart image not found - using coordinates only', 700, 200);
        this.ctx.fillText('Red dots = Weight, Blue dots = Height', 700, 300);
        
        this.drawPlotPoints();
    }
    
    setupEventListeners() {
        document.getElementById('growthForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.plotData();
        });
        
        document.getElementById('toggleCurves').addEventListener('click', () => {
            this.showCurves = !this.showCurves;
            this.drawChart();
            
            const button = document.getElementById('toggleCurves');
            if (this.showCurves) {
                button.textContent = 'Hide Percentile Curves';
                button.style.backgroundColor = '#dc3545'; // Red for hide
            } else {
                button.textContent = 'Show Percentile Curves';
                button.style.backgroundColor = '#28a745'; // Green for show
            }
        });
    }
    
    preloadExampleData() {
        // Pre-fill with the example data provided
        document.getElementById('sex').value = 'Boy';
        document.getElementById('ageYears').value = '15';
        document.getElementById('ageMonths').value = '0';
        document.getElementById('ageDays').value = '0';
        document.getElementById('weight').value = '60';
        document.getElementById('height').value = '165';
        document.getElementById('headCircumference').value = '40.5';
    }
    
    calculateAge() {
        const years = parseFloat(document.getElementById('ageYears').value) || 0;
        const months = parseFloat(document.getElementById('ageMonths').value) || 0;
        const days = parseFloat(document.getElementById('ageDays').value) || 0;
        
        return years + (months / 12) + (days / 365);
    }
    
    mapAgeToX(age) {
        // Linear interpolation between reference points for age (same for both weight and height)
        const { ageRef1, weightXRef1, ageRef2, weightXRef2 } = CHART_CONFIG;
        const slope = (weightXRef2 - weightXRef1) / (ageRef2 - ageRef1);
        return weightXRef1 + slope * (age - ageRef1);
    }
    
    mapWeightToY(weight) {
        // Linear interpolation between reference points for weight
        const { weightRef1, weightYRef1, weightRef2, weightYRef2 } = CHART_CONFIG;
        const slope = (weightYRef2 - weightYRef1) / (weightRef2 - weightRef1);
        return weightYRef1 + slope * (weight - weightRef1);
    }
    
    mapHeightToY(height) {
        // Linear interpolation between reference points for height
        const { heightRef1, heightYRef1, heightRef2, heightYRef2 } = CHART_CONFIG;
        const slope = (heightYRef2 - heightYRef1) / (heightRef2 - heightRef1);
        return heightYRef1 + slope * (height - heightRef1);
    }
    
    plotData() {
        const sex = document.getElementById('sex').value;
        const age = this.calculateAge();
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const headCircumference = parseFloat(document.getElementById('headCircumference').value);
        
        if (!sex || age < 2 || age > 19 || !weight || !height) {
            alert('Please fill in all required fields. Age must be between 2-19 years.');
            return;
        }
        
        if (sex !== 'Boy') {
            alert('This chart is specifically for boys. Please select "Boy" for accurate plotting.');
            return;
        }
        
        const x = this.mapAgeToX(age);
        const weightY = this.mapWeightToY(weight);
        const heightY = this.mapHeightToY(height);
        
        // Determine percentiles using magnetic curves only
        let weightPercentile = 'Magnetic curves loading...';
        let heightPercentile = 'Magnetic curves loading...';
        
        // Use magnetic curves for percentile calculation
        if (this.calibrationManager && this.calibrationManager.fittedCurves) {
            const heightResult = this.calibrationManager.calculatePercentileForPoint(x, heightY, 'height');
            const weightResult = this.calibrationManager.calculatePercentileForPoint(x, weightY, 'weight');
            
            if (heightResult) {
                if (heightResult.type === 'range') {
                    heightPercentile = `${heightResult.range} (range, ${heightResult.confidence} confidence)`;
                } else {
                    heightPercentile = `P${heightResult.percentile.toFixed(1)} (${heightResult.type}, ${heightResult.confidence} confidence)`;
                }
                console.log('🧲 Height percentile from magnetic curves:', heightPercentile);
            }
            
            if (weightResult) {
                if (weightResult.type === 'range') {
                    weightPercentile = `${weightResult.range} (range, ${weightResult.confidence} confidence)`;
                } else {
                    weightPercentile = `P${weightResult.percentile.toFixed(1)} (${weightResult.type}, ${weightResult.confidence} confidence)`;
                }
                console.log('🧲 Weight percentile from magnetic curves:', weightPercentile);
            }
        }
        
        // Add point to our collection
        this.plotPoints.push({
            x: x,
            weightY: weightY,
            heightY: heightY,
            age: age,
            weight: weight,
            height: height,
            headCircumference: headCircumference,
            weightPercentile: weightPercentile,
            heightPercentile: heightPercentile,
            timestamp: new Date()
        });
        
        this.drawChart();
        this.displayResults(x, weightY, heightY, age, weight, height, headCircumference, weightPercentile, heightPercentile);
    }
    
    drawPlotPoints() {
        this.plotPoints.forEach((point, index) => {
            // Draw weight point (red)
            this.ctx.fillStyle = '#ff0000';
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.weightY, 6, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Draw border for weight point
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Draw height point (blue)
            this.ctx.fillStyle = '#0066cc';
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.heightY, 6, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Draw border for height point
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Connect weight and height points with a line
            this.ctx.strokeStyle = '#666666';
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([3, 3]);
            this.ctx.beginPath();
            this.ctx.moveTo(point.x, point.weightY);
            this.ctx.lineTo(point.x, point.heightY);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
            
            // Add label
            this.ctx.fillStyle = '#000000';
            this.ctx.font = '12px Arial';
            this.ctx.fillText(`${index + 1}`, point.x + 10, point.weightY - 10);
        });
    }
    
    displayResults(x, weightY, heightY, age, weight, height, headCircumference, weightPercentile, heightPercentile) {
        const resultsDiv = document.getElementById('results');
        const resultsContent = document.getElementById('resultsContent');
        
        // Calculate percentiles using magnetic curves only
        let magneticWeightPercentile = null;
        let magneticHeightPercentile = null;
        
        if (this.calibrationManager && this.calibrationManager.calculatePercentileForPoint) {
            magneticWeightPercentile = this.calibrationManager.calculatePercentileForPoint(x, weightY, 'weight');
            magneticHeightPercentile = this.calibrationManager.calculatePercentileForPoint(x, heightY, 'height');
        }
        
        // Build the results display using only magnetic curves
        let percentileDisplayHTML = '';
        if (magneticWeightPercentile || magneticHeightPercentile) {
            percentileDisplayHTML = `
                <strong>📊 Percentile Analysis (Magnetic Curves):</strong><br>
                <div style="background: #e8f5e8; padding: 8px; border-radius: 4px; margin: 5px 0; border-left: 4px solid #28a745;">
                    ${magneticWeightPercentile ? `<strong>Weight:</strong> <span style="color: #ff0000;">●</span> ${this.formatPercentileResult(magneticWeightPercentile)}<br>` : ''}
                    ${magneticHeightPercentile ? `<strong>Height:</strong> <span style="color: #0066cc;">●</span> ${this.formatPercentileResult(magneticHeightPercentile)}` : ''}
                </div>`;
        } else {
            // More detailed loading status
            let statusMessage = '';
            if (!this.calibrationManager) {
                statusMessage = 'Calibration manager not initialized. Please refresh the page.';
            } else if (!this.calibrationManager.fittedCurves || Object.keys(this.calibrationManager.fittedCurves).length === 0) {
                statusMessage = 'Magnetic curves are loading automatically. Please wait a moment and try plotting again.';
            } else {
                statusMessage = 'Percentile calculation failed. Please check console for errors.';
            }
            
            percentileDisplayHTML = `
                <strong>📊 Percentile Analysis:</strong><br>
                <div style="background: #fff3cd; padding: 8px; border-radius: 4px; margin: 5px 0; border-left: 4px solid #ffc107;">
                    ${statusMessage}
                </div>`;
        }
        
        resultsContent.innerHTML = `
            <strong>Plotted Points:</strong><br>
            Age: ${age.toFixed(2)} years<br>
            Weight: ${weight} kg<br>
            Height: ${height} cm<br>
            ${headCircumference ? `Head Circumference: ${headCircumference} cm<br>` : ''}
            <br>
            ${percentileDisplayHTML}
            <br>
            <strong>Chart Coordinates:</strong><br>
            X (Age): ${x.toFixed(1)} pixels<br>
            Y (Weight): ${weightY.toFixed(1)} pixels <span style="color: #ff0000;">●</span><br>
            Y (Height): ${heightY.toFixed(1)} pixels <span style="color: #0066cc;">●</span><br>
            <br>
            <strong>Reference Points:</strong><br>
            Weight: (Age ${CHART_CONFIG.ageRef1}, ${CHART_CONFIG.weightRef1}kg) = (${CHART_CONFIG.weightXRef1}, ${CHART_CONFIG.weightYRef1})<br>
            Weight: (Age ${CHART_CONFIG.ageRef2}, ${CHART_CONFIG.weightRef2}kg) = (${CHART_CONFIG.weightXRef2}, ${CHART_CONFIG.weightYRef2})<br>
            Height: (Age ${CHART_CONFIG.ageRef1}, ${CHART_CONFIG.heightRef1}cm) = (${CHART_CONFIG.heightXRef1}, ${CHART_CONFIG.heightYRef1})<br>
            Height: (Age ${CHART_CONFIG.ageRef2}, ${CHART_CONFIG.heightRef2}cm) = (${CHART_CONFIG.heightXRef2}, ${CHART_CONFIG.heightYRef2})
        `;
        
        resultsDiv.style.display = 'block';
        
        // Update the percentile panel using magnetic curves
        this.updatePercentilePanel(null, null, magneticWeightPercentile, magneticHeightPercentile);
    }
    
    formatPercentileResult(result) {
        if (!result) return 'Not available';
        
        if (result.type === 'range') {
            return `${result.range} (P${result.percentile.toFixed(1)}, ${result.confidence} confidence)`;
        } else if (result.type === 'interpolated_with_range') {
            return `${result.range} (P${result.percentile.toFixed(1)}, ${result.confidence} confidence)`;
        } else if (result.percentile !== null) {
            return `P${result.percentile.toFixed(1)} (${result.type}, ${result.confidence} confidence)`;
        } else {
            return 'Not available';
        }
    }
    
    updatePercentilePanel(weightPercentile, heightPercentile, calibratedWeightPercentile, calibratedHeightPercentile) {
        const percentilePanel = document.getElementById('percentilePanel');
        const heightDisplay = document.getElementById('heightPercentileDisplay');
        const weightDisplay = document.getElementById('weightPercentileDisplay');
        const detailsDisplay = document.getElementById('percentileDetails');
        
        // Show the panel
        percentilePanel.style.display = 'block';
        
        // Function to extract percentile number or range from string
        const extractPercentileInfo = (percentileStr) => {
            if (!percentileStr) return null;
            
            // Check for range format like "P50-75"
            const rangeMatch = percentileStr.match(/(P\d+)-(P\d+)/);
            if (rangeMatch) {
                return {
                    type: 'range',
                    display: `${rangeMatch[1]}-${rangeMatch[2]}`,
                    lower: parseFloat(rangeMatch[1].substring(1)),
                    upper: parseFloat(rangeMatch[2].substring(1))
                };
            }
            
            // Check for specific percentile like "P55.2"
            const percentileMatch = percentileStr.match(/P(\d+\.?\d*)/);
            if (percentileMatch) {
                return {
                    type: 'specific',
                    display: `P${parseFloat(percentileMatch[1]).toFixed(1)}`,
                    value: parseFloat(percentileMatch[1])
                };
            }
            
            return null;
        };
        
        // Update height percentile display
        let heightInfo = null;
        let heightSource = '';
        if (calibratedHeightPercentile) {
            if (calibratedHeightPercentile.type === 'range') {
                heightInfo = {
                    type: 'range_with_value',
                    display: `${calibratedHeightPercentile.range} (P${calibratedHeightPercentile.percentile.toFixed(1)})`,
                    value: calibratedHeightPercentile.percentile,
                    lower: parseFloat(calibratedHeightPercentile.range.split('-')[0].substring(1)),
                    upper: parseFloat(calibratedHeightPercentile.range.split('-')[1])
                };
            } else if (calibratedHeightPercentile.type === 'interpolated_with_range') {
                heightInfo = {
                    type: 'range_with_value',
                    display: `${calibratedHeightPercentile.range} (P${calibratedHeightPercentile.percentile.toFixed(1)})`,
                    value: calibratedHeightPercentile.percentile,
                    lower: parseFloat(calibratedHeightPercentile.range.split('-')[0].substring(1)),
                    upper: parseFloat(calibratedHeightPercentile.range.split('-')[1])
                };
            } else {
                heightInfo = {
                    type: 'specific',
                    display: `P${calibratedHeightPercentile.percentile.toFixed(1)}`,
                    value: calibratedHeightPercentile.percentile
                };
            }
            heightSource = 'Magnetic Curves';
        } else {
            heightInfo = extractPercentileInfo(heightPercentile);
            heightSource = 'Computer Vision';
        }
        
        if (heightInfo) {
            heightDisplay.textContent = heightInfo.display;
            if (heightInfo.type === 'specific') {
                heightDisplay.style.background = this.getPercentileColor(heightInfo.value, 0.3);
            } else if (heightInfo.type === 'range_with_value') {
                // For range with specific value, use the specific value for coloring
                heightDisplay.style.background = this.getPercentileColor(heightInfo.value, 0.3);
            } else {
                // For ranges, use color based on the middle value
                const midValue = (heightInfo.lower + heightInfo.upper) / 2;
                heightDisplay.style.background = this.getPercentileColor(midValue, 0.3);
            }
        } else {
            heightDisplay.textContent = '-';
            heightDisplay.style.background = 'rgba(255,255,255,0.2)';
        }
        
        // Update weight percentile display
        let weightInfo = null;
        let weightSource = '';
        if (calibratedWeightPercentile) {
            if (calibratedWeightPercentile.type === 'range') {
                weightInfo = {
                    type: 'range_with_value',
                    display: `${calibratedWeightPercentile.range} (P${calibratedWeightPercentile.percentile.toFixed(1)})`,
                    value: calibratedWeightPercentile.percentile,
                    lower: parseFloat(calibratedWeightPercentile.range.split('-')[0].substring(1)),
                    upper: parseFloat(calibratedWeightPercentile.range.split('-')[1])
                };
            } else if (calibratedWeightPercentile.type === 'interpolated_with_range') {
                weightInfo = {
                    type: 'range_with_value',
                    display: `${calibratedWeightPercentile.range} (P${calibratedWeightPercentile.percentile.toFixed(1)})`,
                    value: calibratedWeightPercentile.percentile,
                    lower: parseFloat(calibratedWeightPercentile.range.split('-')[0].substring(1)),
                    upper: parseFloat(calibratedWeightPercentile.range.split('-')[1])
                };
            } else {
                weightInfo = {
                    type: 'specific',
                    display: `P${calibratedWeightPercentile.percentile.toFixed(1)}`,
                    value: calibratedWeightPercentile.percentile
                };
            }
            weightSource = 'Magnetic Curves';
        } else {
            weightInfo = extractPercentileInfo(weightPercentile);
            weightSource = 'Computer Vision';
        }
        
        if (weightInfo) {
            weightDisplay.textContent = weightInfo.display;
            if (weightInfo.type === 'specific') {
                weightDisplay.style.background = this.getPercentileColor(weightInfo.value, 0.3);
            } else if (weightInfo.type === 'range_with_value') {
                // For range with specific value, use the specific value for coloring
                weightDisplay.style.background = this.getPercentileColor(weightInfo.value, 0.3);
            } else {
                // For ranges, use color based on the middle value
                const midValue = (weightInfo.lower + weightInfo.upper) / 2;
                weightDisplay.style.background = this.getPercentileColor(midValue, 0.3);
            }
        } else {
            weightDisplay.textContent = '-';
            weightDisplay.style.background = 'rgba(255,255,255,0.2)';
        }
        
        // Update details
        if (calibratedHeightPercentile || calibratedWeightPercentile) {
            detailsDisplay.textContent = `Calculated using ${heightSource || weightSource} - High accuracy`;
        } else if (heightInfo !== null || weightInfo !== null) {
            detailsDisplay.textContent = `Calculated using Computer Vision - Medium accuracy`;
        } else {
            detailsDisplay.textContent = `Magnetic curves automatically loaded for accurate percentile calculation`;
        }
    }
    
    getPercentileColor(percentile, alpha = 1.0) {
        // Color coding for percentiles: red for extreme values, green for normal range
        if (percentile < 3 || percentile > 97) {
            return `rgba(255, 0, 0, ${alpha})`; // Red for extreme
        } else if (percentile < 10 || percentile > 90) {
            return `rgba(255, 165, 0, ${alpha})`; // Orange for concerning
        } else if (percentile >= 25 && percentile <= 75) {
            return `rgba(0, 255, 0, ${alpha})`; // Green for normal
        } else {
            return `rgba(255, 255, 0, ${alpha})`; // Yellow for watch
        }
    }
    
    clearPoints() {
        this.plotPoints = [];
        this.drawChart();
        document.getElementById('results').style.display = 'none';
        document.getElementById('percentilePanel').style.display = 'none';
        
        // Update status
        document.getElementById('analysisStatus').innerHTML = 
            '✅ Chart ready! Magnetic curves loaded for accurate percentile calculation.';
    }
    
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.chartPlotter = new GrowthChartPlotter();
    
    // Initialize calibration manager
    window.chartPlotter.calibrationManager = new CurveCalibrationManager(window.chartPlotter);
    
    // Add clear points button functionality
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear All Points';
    clearButton.style.marginTop = '10px';
    clearButton.style.backgroundColor = '#dc3545';
    clearButton.onclick = () => window.chartPlotter.clearPoints();
    
    document.querySelector('.form-section').appendChild(clearButton);
});