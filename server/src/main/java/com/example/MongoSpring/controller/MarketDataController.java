package   com.example.MongoSpring.controller;

import com.example.MongoSpring.service.StockDataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/market")
@CrossOrigin(origins = "http://localhost:3000")
public class MarketDataController {

    private final StockDataService stockDataService;

    public MarketDataController(StockDataService stockDataService) {
        this.stockDataService = stockDataService;
    }

    @GetMapping("/{exchange}")
    public List<Map<String, Object>> getMarketData(@PathVariable String exchange) {
        return stockDataService.getMarketData(exchange);
    }
}