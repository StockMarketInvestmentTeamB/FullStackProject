 
package  com.example.MongoSpring.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class StockDataService {

    @Value("${alpha.vantage.api.key}")
    private String apiKey;
    
    private final RestTemplate restTemplate = new RestTemplate();

    @Cacheable(value = "marketData", key = "#exchange")
    public List<Map<String, Object>> getMarketData(String exchange) {
        if (exchange.equalsIgnoreCase("NSE")) {
            return getNseData();
        } else {
            return getBseData();
        }
    }

    private List<Map<String, Object>> getNseData() {
        String url = String.format(
            "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=%s",
            apiKey);
        
        @SuppressWarnings("unchecked")
        Map<String, Object> response = restTemplate.getForObject(url, HashMap.class);
        return processNseData(response);
    }

    private List<Map<String, Object>> getBseData() {
        String url = String.format(
            "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^BSESN&apikey=%s",
            apiKey);
        
        @SuppressWarnings("unchecked")
        Map<String, Object> response = restTemplate.getForObject(url, HashMap.class);
        return processBseData(response);
    }

    private List<Map<String, Object>> processNseData(Map<String, Object> response) {
        List<Map<String, Object>> result = new ArrayList<>();
       
        @SuppressWarnings("unchecked")
        List<Map<String, String>> topGainers = (List<Map<String, String>>) response.get("top_gainers");
        if (topGainers != null) {
            topGainers.forEach(stock -> {
                Map<String, Object> item = new HashMap<>();
                item.put("name", stock.get("ticker"));
                item.put("price", stock.get("price"));
                item.put("change", stock.get("change_amount"));
                item.put("changePercent", stock.get("change_percentage"));
                item.put("type", "GAINER");
                result.add(item);
            });
        }
        
        @SuppressWarnings("unchecked")
        List<Map<String, String>> topLosers = (List<Map<String, String>>) response.get("top_losers");
        if (topLosers != null) {
            topLosers.forEach(stock -> {
                Map<String, Object> item = new HashMap<>();
                item.put("name", stock.get("ticker"));
                item.put("price", stock.get("price"));
                item.put("change", stock.get("change_amount"));
                item.put("changePercent", stock.get("change_percentage"));
                item.put("type", "LOSER");
                result.add(item);
            });
        }
        
        return result;
    }

    private List<Map<String, Object>> processBseData(Map<String, Object> response) {
        List<Map<String, Object>> result = new ArrayList<>();
        
        @SuppressWarnings("unchecked")
        Map<String, Map<String, String>> timeSeries = (Map<String, Map<String, String>>) response.get("Time Series (Daily)");
        if (timeSeries != null && !timeSeries.isEmpty()) {
            String latestDate = timeSeries.keySet().iterator().next();
            Map<String, String> latestData = timeSeries.get(latestDate);
            
            Map<String, Object> item = new HashMap<>();
            item.put("name", "SENSEX");
            item.put("price", latestData.get("4. close"));
            item.put("change", 
                Double.parseDouble(latestData.get("4. close")) - 
                Double.parseDouble(latestData.get("1. open")));
            item.put("changePercent", 
                ((Double.parseDouble(latestData.get("4. close")) - 
                  Double.parseDouble(latestData.get("1. open"))) / 
                 Double.parseDouble(latestData.get("1. open"))) * 100);
            item.put("type", "INDEX");
            result.add(item);
        }
        addSampleBseStocks(result);
        
        return result;
    }

    private void addSampleBseStocks(List<Map<String, Object>> result) {
        String[][] sampleStocks = {
            {"RELIANCE", "2500.50", "25.75", "1.03"},
            {"TATASTEEL", "120.75", "-1.25", "-1.02"},
            {"HDFCBANK", "1500.25", "15.50", "1.04"},
            {"ICICIBANK", "800.60", "-5.40", "-0.67"},
            {"INFY", "1600.00", "20.00", "1.25"}
        };
        
        for (String[] stock : sampleStocks) {
            Map<String, Object> item = new HashMap<>();
            item.put("name", stock[0]);
            item.put("price", stock[1]);
            item.put("change", stock[2]);
            item.put("changePercent", stock[3]);
            item.put("type", Double.parseDouble(stock[2]) >= 0 ? "GAINER" : "LOSER");
            result.add(item);
        }
    }
}
