// Chart configurations for both boys and girls
const CHART_CONFIGS = {
    Boy: {
        imageSrc: 'Weight-and-height_Boys_2-19-years.png',
        curvesDataSrc: 'magnetic_curves_webapp.json',
        curveArrayOrder: {
            height: ['P97','P90','P75','P50','P25','P10','P3'],
            weight: ['P3','P10','P25','P50','P75','P90','P97']
        },
        minAge: 2,
        maxAge: 19,
        chartType: 'AGE',
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
    },
    Girl: {
        imageSrc: 'Thai Growth Chart Girls 2-19 Years.png',
        curvesDataSrc: 'thai_growth_chart_girls_2_19_years_curves.json',
        // For girls dataset the raw array lists height curves first (tallest to shortest) then weight curves but in descending heavy-to-light order.
        // We want weight curves labeled P97->P3 according to provided ordering sequence (current heuristic made them ascend P3..P97).
        curveArrayOrder: {
            height: ['P97','P90','P75','P50','P25','P10','P3'],
            weight: ['P97','P90','P75','P50','P25','P10','P3']
        },
        minAge: 2,
        maxAge: 19,
    chartType: 'AGE',
        // Weight reference points: (age 2, 5kg) = (236, 3307), (age 19, 90kg) = (2245, 1299)
        ageRef1: 2,
        weightRef1: 5,
        weightXRef1: 236,
        weightYRef1: 3307,
        
        ageRef2: 19,
        weightRef2: 90,
        weightXRef2: 2245,
        weightYRef2: 1299,
        
        // Height reference points: (age 2, 85cm) = (236, 2717), (age 19, 180cm) = (2245, 472.5)
        heightRef1: 85,
        heightXRef1: 236,
        heightYRef1: 2717,
        
        heightRef2: 180,
        heightXRef2: 2245,
        heightYRef2: 472.5
    },
    Girl_0_2: {
        imageSrc: 'Thai Growth Chart Girls 0-2 Years.png',
        curvesDataSrc: 'thai_growth_chart_girls_0_2_years_curves.json',
        // Assuming same ordering convention: first 7 height (tallest to shortest), then 7 weight (heaviest to lightest)
        curveArrayOrder: {
            height: ['P97','P90','P75','P50','P25','P10','P3'],
            weight: ['P97','P90','P75','P50','P25','P10','P3']
        },
        minAge: 0,
        maxAge: 2,
    chartType: 'AGE',
        // Provided reference points (age in months converted to years for age mapping):
        // (age 0 months, 2kg) = (236,3307), (age 24 months, 15kg) = (2245,1705)
        ageRef1: 0, // years
        weightRef1: 2,
        weightXRef1: 236,
        weightYRef1: 3307,
        ageRef2: 2, // 24 months
        weightRef2: 15,
        weightXRef2: 2245,
        weightYRef2: 1705,
        // Height/Length refs: (0m,45cm)=(236,2937.5), (24m,95cm)=(2245,472.5)
        heightRef1: 45,
        heightXRef1: 236,
        heightYRef1: 2937.5,
        heightRef2: 95,
        heightXRef2: 2245,
        heightYRef2: 472.5
    },
    Boy_0_2: {
        imageSrc: 'Thai Growth Chart Boys 0-2 Years.png',
        curvesDataSrc: 'thai_growth_chart_boys_0_2_years_curves.json',
        curveArrayOrder: {
            height: ['P97','P90','P75','P50','P25','P10','P3'],
            weight: ['P97','P90','P75','P50','P25','P10','P3']
        },
        minAge: 0,
        maxAge: 2,
    chartType: 'AGE',
    // Provided reference points (age 0 months, 2kg)=(236,3307), (age24 months,15kg)=(2245,1705)
        // Provided reference points (age 0 months, 2kg)=(236,3307), (age24 months,15kg)=(2245,1705)
        ageRef1: 0,
        weightRef1: 2,
        weightXRef1: 236,
        weightYRef1: 3307,
        ageRef2: 2,
        weightRef2: 15,
        weightXRef2: 2245,
        weightYRef2: 1705,
        // Height/Length references (0m,45cm)=(236,2937.5), (24m,95cm)=(2245,472.5)
        heightRef1: 45,
        heightXRef1: 236,
        heightYRef1: 2937.5,
        heightRef2: 95,
        heightXRef2: 2245,
        heightYRef2: 472.5
    }
    ,Boy_WFH: {
        imageSrc: 'WFH_boy.png',
        curvesDataSrc: 'wfh_boy_curves.json',
        curveArrayOrder: {
            height: [],
            weight: ['P97','P90','P75','P50','P25','P10','P3']
        },
        minAge: 2,
        maxAge: 19,
        chartType: 'WFH',
        ageRef1: 2,
        ageRef2: 19,
        // Weight-for-Height reference anchors (height,weight) -> pixels
        // (height 90cm, weight 10kg) = (236,3307); (height 180cm, weight 85kg) = (2244.5,472.5)
        weightRef1: 10,
        weightYRef1: 3307,
        weightXRef1: 236, // x corresponds to heightRef1 height 90
        heightRef1: 90,
        heightXRef1: 236,
        heightYRef1: 2937.5, // not used directly for x mapping (optionally can reflect length grid)
        weightRef2: 85,
        weightYRef2: 472.5,
        weightXRef2: 2244.5, // x corresponds to heightRef2 height 180
        heightRef2: 180,
        heightXRef2: 2244.5,
        heightYRef2: 472.5
    }
    ,Girl_WFH: {
        imageSrc: 'WFH_girl.png',
        curvesDataSrc: 'wfh_girl_curves.json',
        curveArrayOrder: {
            height: [],
            weight: ['P97','P90','P75','P50','P25','P10','P3']
        },
        minAge: 2,
        maxAge: 19,
        chartType: 'WFH',
        ageRef1: 2,
        ageRef2: 19,
        // Provided Girl WFH anchors: (height 90cm, weight 10kg)=(236,3307); (height 170cm, weight 85kg)=(2244.5,472.5)
        weightRef1: 10,
        weightYRef1: 3307,
        weightXRef1: 236,
        heightRef1: 90,
        heightXRef1: 236,
        heightYRef1: 2937.5,
        weightRef2: 85,
        weightYRef2: 472.5,
        weightXRef2: 2244.5,
        heightRef2: 170,
        heightXRef2: 2244.5,
        heightYRef2: 472.5
    }
    ,Boy_HC: {
        imageSrc: 'HC_boy.png',
        curvesDataSrc: 'hc_boy_curves.json',
        curveArrayOrder: {
            head: ['P97','P90','P75','P50','P25','P10','P3']
        },
        minAge: 0,
        maxAge: 5,
        chartType: 'HC',
        // Head circumference reference anchors (age years, HC cm)
        // (age 0y, 30cm)=(236,1831); (age 5y, 55cm)=(2244.5,472.5)
        ageRef1: 0,
        headRef1: 30,
        headXRef1: 236,
        headYRef1: 1831,
        ageRef2: 5,
        headRef2: 55,
        headXRef2: 2244.5,
        headYRef2: 472.5
    }
    ,Girl_HC: {
        imageSrc: 'HC_girl.png',
        curvesDataSrc: 'hc_girl_curves.json',
        curveArrayOrder: {
            head: ['P97','P90','P75','P50','P25','P10','P3']
        },
        minAge: 0,
        maxAge: 5,
        chartType: 'HC',
        // Head circumference reference anchors (age years, HC cm) provided by user
        ageRef1: 0,
        headRef1: 30,
        headXRef1: 236,
        headYRef1: 1831,
        ageRef2: 5,
        headRef2: 55,
        headXRef2: 2244.5,
        headYRef2: 472.5
    }
};

class GrowthChartPlotter {
    constructor() {
        this.canvas = document.getElementById('chartCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.chartImage = new Image();
        this.plotPoints = [];
        this.showCurves = true;
        this.calibrationManager = null;
        this.currentSex = 'Girl'; // Default to Girl to showcase new feature
        
        this.initializeChart();
        this.setupEventListeners();
        this.preloadExampleData();
    }
    
    getCurrentConfig() {
        return CHART_CONFIGS[this.currentSex];
    }
    
    initializeChart() {
        this.loadChartForCurrentSex();
    }
    
    loadChartForCurrentSex() {
        const config = this.getCurrentConfig();
        
        this.chartImage.onload = async () => {
            // Set the actual canvas size to the image dimensions
            this.originalWidth = this.chartImage.width;
            this.originalHeight = this.chartImage.height;
            
            this.resizeCanvas();
            this.drawChart();
            
            console.log(`${this.currentSex} chart loaded successfully!`);
            
            // Update status
            document.getElementById('analysisStatus').innerHTML = 
                `✅ ${this.currentSex} chart loaded! Magnetic curves will load automatically.`;
            
            // Reload curves for the new sex
            if (this.calibrationManager) {
                this.calibrationManager.loadCurvesForSex(this.currentSex);
            }
            
            // Add resize listener for responsive behavior
            window.addEventListener('resize', () => {
                this.resizeCanvas();
                this.drawChart();
            });
        };
        
        this.chartImage.onerror = () => {
            console.error(`Failed to load ${this.currentSex} chart image`);
            // Create a fallback canvas
            this.originalWidth = 2500;
            this.originalHeight = 3500;
            this.resizeCanvas();
            this.drawFallbackChart();
        };
        
        this.chartImage.src = config.imageSrc;
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
        this.ctx.fillText(`${this.currentSex}s Growth Chart (2-19 years)`, 800, 100);
        this.ctx.fillText('Chart image not found - using coordinates only', 700, 200);
        this.ctx.fillText('Red dots = Weight, Blue dots = Height', 700, 300);
        
        this.drawPlotPoints();
    }
    
    setupEventListeners() {
        document.getElementById('growthForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.plotData();
        });
        
        // Handle sex selection changes
        document.getElementById('sex').addEventListener('change', (e) => {
            const newSex = e.target.value;
            if (newSex !== this.currentSex) {
                this.currentSex = newSex;
                this.clearPoints(); // Clear existing points when switching charts
                this.loadChartForCurrentSex(); // Load new chart
                console.log(`Switched to ${this.currentSex} chart`);
            }
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
        // Pre-fill with the example data - use Girl to showcase new feature
        document.getElementById('sex').value = 'Girl';
        document.getElementById('ageYears').value = '15';
        document.getElementById('ageMonths').value = '0';
        document.getElementById('ageDays').value = '0';
        document.getElementById('weight').value = '55';
        document.getElementById('height').value = '160';
        document.getElementById('headCircumference').value = '40.5';
        
        // currentSex is already set to 'Girl' in constructor
    }
    
    calculateAge() {
        const years = parseFloat(document.getElementById('ageYears').value) || 0;
        const months = parseFloat(document.getElementById('ageMonths').value) || 0;
        const days = parseFloat(document.getElementById('ageDays').value) || 0;
        
        return years + (months / 12) + (days / 365);
    }
    
    mapAgeToX(age) {
        // Linear interpolation between reference points for age (same for both weight and height)
        const config = this.getCurrentConfig();
        // For HC charts, use headXRef values instead of weightXRef
        if (config.chartType === 'HC') {
            const { ageRef1, headXRef1, ageRef2, headXRef2 } = config;
            const slope = (headXRef2 - headXRef1) / (ageRef2 - ageRef1);
            return headXRef1 + slope * (age - ageRef1);
        } else {
            const { ageRef1, weightXRef1, ageRef2, weightXRef2 } = config;
            const slope = (weightXRef2 - weightXRef1) / (ageRef2 - ageRef1);
            return weightXRef1 + slope * (age - ageRef1);
        }
    }

    mapHeightToXForWFH(height) {
        const config = this.getCurrentConfig();
        const { heightRef1, heightXRef1, heightRef2, heightXRef2 } = config;
        const slope = (heightXRef2 - heightXRef1) / (heightRef2 - heightRef1);
        return heightXRef1 + slope * (height - heightRef1);
    }
    
    mapWeightToY(weight) {
        // Linear interpolation between reference points for weight
        const config = this.getCurrentConfig();
        const { weightRef1, weightYRef1, weightRef2, weightYRef2 } = config;
        const slope = (weightYRef2 - weightYRef1) / (weightRef2 - weightRef1);
        return weightYRef1 + slope * (weight - weightRef1);
    }
    
    mapHeightToY(height) {
        // Linear interpolation between reference points for height
        const config = this.getCurrentConfig();
        const { heightRef1, heightYRef1, heightRef2, heightYRef2 } = config;
        const slope = (heightYRef2 - heightYRef1) / (heightRef2 - heightRef1);
        return heightYRef1 + slope * (height - heightRef1);
    }

    // Mapping specifically for head circumference on HC charts
    mapHeadToY(headCircumference) {
        const config = this.getCurrentConfig();
        if (config.chartType !== 'HC') return null;
        const { headRef1, headYRef1, headRef2, headYRef2 } = config;
        const slope = (headYRef2 - headYRef1) / (headRef2 - headRef1);
        return headYRef1 + slope * (headCircumference - headRef1);
    }
    
    plotData() {
        const sex = document.getElementById('sex').value;
        const age = this.calculateAge();
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const headCircumference = parseFloat(document.getElementById('headCircumference').value);
        const config = this.getCurrentConfig();

        // Validation differs per chart type
        if (config.chartType === 'HC') {
            if (!sex || isNaN(headCircumference)) {
                alert('Please enter head circumference.');
                return;
            }
        } else if (config.chartType === 'WFH') {
            if (!sex || isNaN(weight) || isNaN(height)) {
                alert('Please enter weight and height.');
                return;
            }
        } else { // AGE chart
            if (!sex || isNaN(weight) || isNaN(height)) {
                alert('Please enter weight and height.');
                return;
            }
        }

        if (age < config.minAge || age > config.maxAge) {
            alert(`Age must be between ${config.minAge}-${config.maxAge} years for this chart.`);
            return;
        }

        if (sex !== this.currentSex) {
            this.currentSex = sex;
            this.clearPoints();
            this.loadChartForCurrentSex();
            setTimeout(() => this.plotData(), 500);
            return;
        }

        let x;
        let weightY = null;
        let heightY = null;

        if (config.chartType === 'WFH') {
            x = this.mapHeightToXForWFH(height);
            weightY = this.mapWeightToY(weight); // weight plotted vs height
        } else if (config.chartType === 'HC') {
            x = this.mapAgeToX(age);
            const headY = this.mapHeadToY(headCircumference);
            weightY = headY; // reuse weightY slot for simplified downstream logic
        } else { // AGE
            x = this.mapAgeToX(age);
            weightY = this.mapWeightToY(weight);
            heightY = this.mapHeightToY(height);
        }

        // Percentile placeholders
        let weightPercentile = 'Magnetic curves loading...';
        let heightPercentile = 'Magnetic curves loading...';

        if (this.calibrationManager && this.calibrationManager.fittedCurves) {
            if (config.chartType === 'HC') {
                const headResult = this.calibrationManager.calculatePercentileForPoint(x, weightY, 'head');
                if (headResult) {
                    if (headResult.type === 'range') {
                        weightPercentile = `${headResult.range} (range, ${headResult.confidence} confidence)`;
                    } else {
                        weightPercentile = `P${headResult.percentile.toFixed(1)} (${headResult.type}, ${headResult.confidence} confidence)`;
                    }
                    console.log('🧲 Head circumference percentile from magnetic curves:', weightPercentile);
                }
            } else {
                const weightResult = this.calibrationManager.calculatePercentileForPoint(x, weightY, 'weight');
                const heightResult = (config.chartType === 'WFH' || heightY === null) ? null : this.calibrationManager.calculatePercentileForPoint(x, heightY, 'height');

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
        }

        this.plotPoints.push({
            chartType: config.chartType,
            x,
            weightY,
            heightY,
            age,
            weight,
            height,
            headCircumference,
            weightPercentile,
            heightPercentile,
            sex,
            timestamp: new Date()
        });

        this.drawChart();
        this.displayResults(x, weightY, heightY, age, weight, height, headCircumference, weightPercentile, heightPercentile);
    }
    
    drawPlotPoints() {
        this.plotPoints.forEach((point, index) => {
            if (point.chartType === 'HC') {
                // Head circumference point (purple)
                this.ctx.fillStyle = '#800080';
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.weightY, 6, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            } else {
                // Weight point (red)
                this.ctx.fillStyle = '#ff0000';
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.weightY, 6, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }

            if (point.chartType === 'AGE' && point.heightY !== null) {
                // Height point (blue) and connecting line
                this.ctx.fillStyle = '#0066cc';
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.heightY, 6, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                this.ctx.strokeStyle = '#666666';
                this.ctx.lineWidth = 1;
                this.ctx.setLineDash([3, 3]);
                this.ctx.beginPath();
                this.ctx.moveTo(point.x, point.weightY);
                this.ctx.lineTo(point.x, point.heightY);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
            }

            // Label
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
        
        const config = this.getCurrentConfig();
        if (this.calibrationManager && this.calibrationManager.calculatePercentileForPoint) {
            if (config.chartType === 'HC') {
                magneticWeightPercentile = this.calibrationManager.calculatePercentileForPoint(x, weightY, 'head');
                magneticHeightPercentile = null;
            } else {
                magneticWeightPercentile = this.calibrationManager.calculatePercentileForPoint(x, weightY, 'weight');
                magneticHeightPercentile = (config.chartType === 'WFH' || heightY === null) ? null : this.calibrationManager.calculatePercentileForPoint(x, heightY, 'height');
            }
        }
        
        // Build the results display using only magnetic curves
        let percentileDisplayHTML = '';
        if (magneticWeightPercentile || magneticHeightPercentile) {
            if (config.chartType === 'HC') {
                percentileDisplayHTML = `
                <strong>📊 Head Circumference Percentile (Magnetic Curves):</strong><br>
                <div style="background: #e8f5e8; padding: 8px; border-radius: 4px; margin: 5px 0; border-left: 4px solid #28a745;">
                    ${magneticWeightPercentile ? `<strong>Head:</strong> <span style="color: #800080;">●</span> ${this.formatPercentileResult(magneticWeightPercentile)}` : ''}
                </div>`;
            } else {
                percentileDisplayHTML = `
                <strong>📊 Percentile Analysis (Magnetic Curves):</strong><br>
                <div style="background: #e8f5e8; padding: 8px; border-radius: 4px; margin: 5px 0; border-left: 4px solid #28a745;">
                    ${magneticWeightPercentile ? `<strong>Weight:</strong> <span style="color: #ff0000;">●</span> ${this.formatPercentileResult(magneticWeightPercentile)}<br>` : ''}
                    ${magneticHeightPercentile ? `<strong>Height:</strong> <span style="color: #0066cc;">●</span> ${this.formatPercentileResult(magneticHeightPercentile)}` : ''}
                </div>`;
            }
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
        
        // config already defined above
        let referenceHTML = '';
        if (config.chartType === 'WFH') {
            referenceHTML = `Weight: (Height ${config.heightRef1}cm, ${config.weightRef1}kg) = (${config.weightXRef1}, ${config.weightYRef1})<br>
            Weight: (Height ${config.heightRef2}cm, ${config.weightRef2}kg) = (${config.weightXRef2}, ${config.weightYRef2})`;
        } else if (config.chartType === 'HC') {
            referenceHTML = `Head: (Age ${config.ageRef1}y, ${config.headRef1}cm) = (${config.headXRef1}, ${config.headYRef1})<br>
            Head: (Age ${config.ageRef2}y, ${config.headRef2}cm) = (${config.headXRef2}, ${config.headYRef2})`;
        } else {
            referenceHTML = `Weight: (Age ${config.ageRef1}, ${config.weightRef1}kg) = (${config.weightXRef1}, ${config.weightYRef1})<br>
            Weight: (Age ${config.ageRef2}, ${config.weightRef2}kg) = (${config.weightXRef2}, ${config.weightYRef2})`;
        }
        resultsContent.innerHTML = `
            <strong>Plotted Points:</strong><br>
            Age: ${age.toFixed(2)} years<br>
            ${config.chartType === 'HC' ? '' : `Weight: ${isNaN(weight) ? '-' : weight} kg<br>`}
            ${config.chartType === 'HC' ? '' : `Height: ${isNaN(height) ? '-' : height} cm<br>`}
            ${headCircumference ? `Head Circumference: ${headCircumference} cm<br>` : ''}
            <br>
            ${percentileDisplayHTML}
            <br>
            <strong>Chart Coordinates:</strong><br>
            X (${config.chartType === 'WFH' ? 'Height' : 'Age'}): ${x.toFixed(1)} pixels<br>
            ${config.chartType === 'HC' ? `Y (Head): ${weightY.toFixed(1)} pixels <span style=\"color: #800080;\">●</span><br>` : `Y (Weight): ${weightY.toFixed(1)} pixels <span style=\"color: #ff0000;\">●</span><br>`}
            ${config.chartType === 'AGE' && heightY !== null ? `Y (Height): ${heightY.toFixed(1)} pixels <span style=\"color: #0066cc;\">●</span><br>` : ''}
            <br>
            <strong>Reference Points (${this.currentSex}):</strong><br>
            ${referenceHTML}<br>
            ${config.chartType === 'AGE' ? `Height: (Age ${config.ageRef1}, ${config.heightRef1}cm) = (${config.heightXRef1}, ${config.heightYRef1})<br>Height: (Age ${config.ageRef2}, ${config.heightRef2}cm) = (${config.heightXRef2}, ${config.heightYRef2})` : ''}
        `;
        
        resultsDiv.style.display = 'block';
        
        // Update the percentile panel using magnetic curves
        this.updatePercentilePanel(null, null, magneticWeightPercentile, magneticHeightPercentile);
    }
    
    formatPercentileResult(result) {
        if (!result) return 'Not available';
        
        if (result.type === 'extreme' && result.displayPercentile) {
            return `${result.displayPercentile} (${result.type}, ${result.confidence} confidence)`;
        } else if (result.type === 'range') {
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
        const config = this.getCurrentConfig();

        // Adjust header if needed
        const headerEl = document.getElementById('percentileHeader');
        if (headerEl) {
            if (config.chartType === 'WFH') {
                headerEl.textContent = '📊 Weight-for-Height Percentile';
            } else if (config.chartType === 'HC') {
                headerEl.textContent = '📊 Head Circumference Percentile';
            } else {
                headerEl.textContent = '📊 Percentile Analysis';
            }
        }
        
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
        
        // For Weight-for-Height chart, we only show Weight (W/H) percentile using weight curves; hide height block.
        if (config.chartType === 'WFH' || config.chartType === 'HC') {
            const heightWrapper = heightDisplay?.parentElement; // assuming structure label + span inside parent
            if (heightWrapper) {
                heightWrapper.style.display = 'none';
            }
        } else {
            const heightWrapper = heightDisplay?.parentElement;
            if (heightWrapper) {
                heightWrapper.style.display = '';
            }
        }

        // Update height percentile display (skip if WFH)
        let heightInfo = null;
        let heightSource = '';
        if (config.chartType !== 'WFH' && calibratedHeightPercentile) {
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
            } else if (calibratedHeightPercentile.type === 'extreme' && calibratedHeightPercentile.displayPercentile) {
                heightInfo = {
                    type: 'extreme',
                    display: calibratedHeightPercentile.displayPercentile,
                    value: calibratedHeightPercentile.percentile
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
        
        if (config.chartType === 'WFH') {
            // already hidden
        } else if (config.chartType === 'HC') {
            // height hidden; nothing to assign
        } else if (heightInfo) {
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
            } else if (calibratedWeightPercentile.type === 'extreme' && calibratedWeightPercentile.displayPercentile) {
                weightInfo = {
                    type: 'extreme',
                    display: calibratedWeightPercentile.displayPercentile,
                    value: calibratedWeightPercentile.percentile
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
            // Prefix label for WFH or HC scenario
            if (config.chartType === 'WFH') weightDisplay.textContent = `W/H: ${weightInfo.display}`;
            else if (config.chartType === 'HC') weightDisplay.textContent = `Head: ${weightInfo.display}`;
            else weightDisplay.textContent = weightInfo.display;
            if (weightInfo.type === 'specific') {
                // Adjust display for extreme numeric values outside 3-97
                if (typeof weightInfo.value === 'number') {
                    if (weightInfo.value < 3) {
                        weightDisplay.textContent = (config.chartType === 'WFH') ? `W/H: <P3` : (config.chartType === 'HC' ? `Head: <P3` : '<P3');
                    } else if (weightInfo.value > 97) {
                        weightDisplay.textContent = (config.chartType === 'WFH') ? `W/H: >P97` : (config.chartType === 'HC' ? `Head: >P97` : '>P97');
                    }
                }
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
            `✅ ${this.currentSex} chart ready! Magnetic curves loaded for accurate percentile calculation.`;
    }
    
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.chartPlotter = new GrowthChartPlotter();
    
    // Initialize calibration manager
    window.chartPlotter.calibrationManager = new CurveCalibrationManager(window.chartPlotter);

    // Explicitly load curves for the initial sex (supports dynamic sex default)
    if (window.chartPlotter && window.chartPlotter.currentSex) {
        const sex = window.chartPlotter.currentSex;
        const config = CHART_CONFIGS[sex];
        if (config && window.chartPlotter.calibrationManager.loadCurvesForSex) {
            window.chartPlotter.calibrationManager.loadCurvesForSex(sex);
        }
    }
    
    // Add clear points button functionality
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear All Points';
    clearButton.style.marginTop = '10px';
    clearButton.style.backgroundColor = '#dc3545';
    clearButton.onclick = () => window.chartPlotter.clearPoints();
    
    document.querySelector('.form-section').appendChild(clearButton);
});