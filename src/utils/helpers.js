/**
 * Utility functions for the Lokas application
 */

/**
 * Determines text color (light or dark) based on background color brightness
 * @param {string} hexColor - Hex color code
 * @returns {string} - Either white or dark gray depending on background
 */
export const getTextColor = (hexColor) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate brightness using perceived luminance formula
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    
    // Return white text for dark backgrounds, dark grey for light backgrounds
    return brightness > 0.65 ? '#333333' : '#ffffff';
  };
  
  /**
   * Generates a subtle gradient variation of a color
   * @param {string} baseColor - Base hex color
   * @param {number} variation - Amount to vary (0-1)
   * @returns {string} - CSS gradient string
   */
  export const generateGradient = (baseColor, variation = 0.05) => {
    // Convert hex to RGB
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    
    // Create slightly lighter variant (limit to valid RGB values)
    const rLight = Math.min(255, Math.floor(r * (1 + variation)));
    const gLight = Math.min(255, Math.floor(g * (1 + variation)));
    const bLight = Math.min(255, Math.floor(b * (1 + variation)));
    
    // Create slightly darker variant
    const rDark = Math.floor(r * (1 - variation));
    const gDark = Math.floor(g * (1 - variation));
    const bDark = Math.floor(b * (1 - variation));
    
    const lighterColor = `rgb(${rLight}, ${gLight}, ${bLight})`;
    const darkerColor = `rgb(${rDark}, ${gDark}, ${bDark})`;
    
    return `linear-gradient(135deg, ${lighterColor} 0%, ${baseColor} 50%, ${darkerColor} 100%)`;
  };
  
  /**
   * Returns Sanskrit text for each Loka (can be populated later)
   * @param {string} lokaId - Loka identifier
   * @returns {string} - Sanskrit text for the Loka
   */
  export const getSanskritText = (lokaId) => {
    const sanskritTexts = {
      "satya-loka": "सत्य लोक",
      "tapa-loka": "तप लोक",
      "jana-loka": "जन लोक",
      "mahar-loka": "महर् लोक",
      "svar-loka": "स्वर्ग लोक",
      "bhuvar-loka": "भुवर् लोक",
      "bhu-loka": "भू लोक",
      "atala": "अतल",
      "vitala": "वितल",
      "sutala": "सुतल",
      "talatala": "तलातल",
      "mahatala": "महातल",
      "rasatala": "रसातल",
      "patala": "पाताल"
    };
    
    return sanskritTexts[lokaId] || "";
  };
  
  /**
   * Format numbers for display with commas
   * @param {number} num - Number to format
   * @returns {string} - Formatted number with commas
   */
  export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };